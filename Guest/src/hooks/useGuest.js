import { useEffect, useMemo, useState } from "react";
import { publicGuestController } from "../controller/public.guest.controller.js";

export const useGuest = (userId) => {
  const guestControl = useMemo(() => publicGuestController(userId), [userId]);

  const [listCategory, setListCategory] = useState({ breakFast: [], lunch: [], dinner: [], refreshment: [] });
  const [hotelDetails, setHotelDetails] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);
  const [guestOrderList, setGuestOrderList] = useState([]);
  const [selectRoom, setSelectRoom] = useState(0);
  const [activeCategory, setActiveCategory] = useState("BreakFast");
  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddBTN, setShowAddBTN] = useState(false);
  const [showAlertmentModal, setShowAlertmentModal] = useState(false);
  const [showGuestVerify, setShowGuestVerify] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState("Review");
  const [guestVerification, setGuestVerification] = useState(false);
  const [navigateCartPage, setNavigateCartage] = useState(false);
  const [navigateOrderListPage, setNavigateOrderListPage] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const category = [
    { name: "Break Fast", label: "BreakFast" },
    { name: "Lunch", label: "Lunch" },
    { name: "Dinner", label: "Dinner" },
    { name: "Refreshment", label: "Refreshment" },
  ];

  const showToast = (type, message) => {
    setToast({ type, message, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchGetFoods = async () => {
    const foodList = await guestControl.getFoodsByUser();
    const availableFoods = foodList.filter((food) => food.isAvailable !== false);
    setListCategory({
      breakFast: availableFoods.filter((food) => food.category === "BreakFast"),
      lunch: availableFoods.filter((food) => food.category === "Lunch"),
      dinner: availableFoods.filter((food) => food.category === "Dinner"),
      refreshment: availableFoods.filter((food) => food.category === "Refreshment"),
    });
  };

  const fetchHotelDetails = async () => {
    const hotel = await guestControl.getHotelByUser();
    setHotelDetails(hotel);
  };

  const fetchGuestDetails = async (mobile, roomNumber) => {
    const guest = await guestControl.getGuestDetailsByUser(mobile, roomNumber);
    setGuestDetails(guest);
    return guest;
  };

  const fetchGetOrderDetails = async (guestId) => {
    const orderList = await guestControl.getGuestOrdersList(guestId);
    setGuestOrderList(orderList);
  };

  useEffect(() => {
    if (!userId) return;
    fetchGetFoods();
    fetchHotelDetails();
  }, [userId]);

  useEffect(() => {
    const total = Object.values(cart).reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const getActiveFoods = (currentCategory) => {
    switch (currentCategory) {
      case "BreakFast": return listCategory.breakFast;
      case "Lunch": return listCategory.lunch;
      case "Dinner": return listCategory.dinner;
      case "Refreshment": return listCategory.refreshment;
      default: return [];
    }
  };

  const handleAddBTN = (food) => {
    if (selectRoom === 0) {
      setShowAddBTN(true);
      showToast("danger", "Please select your room number first");
      setTimeout(() => setShowAddBTN(false), 3000);
      return;
    }
    addToCart(food);
    showToast("success", `${food.title} added to cart`);
  };

  const addToCart = (food) => {
    setCart((prev) => ({
      ...prev,
      [food._id]: {
        foodId: food._id,
        title: food.title,
        price: Number(food.price) || 0,
        quantity: prev[food._id]?.quantity ? prev[food._id].quantity + 1 : 1,
        roomNo: selectRoom,
      },
    }));
  };

  const increaseQty = (food) => addToCart(food);

  const decreaseQty = (food) => {
    setCart((prev) => {
      if (!prev[food._id]) return prev;
      const qty = prev[food._id].quantity - 1;
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[food._id];
        return updated;
      }
      return { ...prev, [food._id]: { ...prev[food._id], quantity: qty } };
    });
  };

  const getQty = (id) => cart[id]?.quantity || 0;
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  const handleGuestVerify = async (rooms, mobile) => {
    const cleanMobile = String(mobile || "").trim();
    if (!/^\d{10}$/.test(cleanMobile)) {
      showToast("danger", "Enter a valid 10 digit mobile number");
      return;
    }
    setIsLoading(true);
    const guest = await fetchGuestDetails(cleanMobile, rooms);
    setIsLoading(false);
    if (guest && guest.isStay === "Yes") {
      setGuestVerification(true);
      setShowGuestVerify(false);
      setNavigateCartage(true);
      showToast("success", "Mobile verified successfully");
    } else {
      showToast("danger", "Guest not valid or not staying in this room");
    }
  };

  const handleGotoCartPage = () => {
    if (cartCount === 0) {
      showToast("danger", "Please add at least one food item");
      return;
    }
    if (!guestVerification) setShowGuestVerify(true);
    else setNavigateCartage(true);
  };

  const handleGuestOrder = async () => {
    if (!guestDetails) {
      showToast("danger", "Guest details missing. Please verify again.");
      setShowGuestVerify(true);
      return;
    }
    if (cartCount === 0) {
      showToast("danger", "Your cart is empty");
      return;
    }
    const foodsArray = Object.values(cart).map((item) => ({ title: item.title, price: item.price, quantity: item.quantity }));
    const orderPayload = {
      guestId: guestDetails._id,
      mobile: guestDetails.mobile,
      name: guestDetails.name,
      roomNumber: guestDetails.roomNumber,
      amount: totalAmount,
      date: new Date().toLocaleString(),
      foods: foodsArray,
      userId,
    };
    setIsLoading(true);
    const res = await guestControl.guestOrder(orderPayload);
    setIsLoading(false);
    if (res?.success) {
      setCart({});
      setShowAlertmentModal(false);
      setNavigateCartage(false);
      setOrderPlaced(true);
      await fetchGetOrderDetails(guestDetails._id);
      setNavigateOrderListPage(true);
      showToast("success", "Thanks for ordering! Your order was placed.");
    } else {
      showToast("danger", res?.message || "Order failed");
    }
  };

  const handlefetchOrderList = async () => {
    if (!guestDetails) {
      setShowGuestVerify(true);
      return;
    }
    await fetchGetOrderDetails(guestDetails._id);
    setNavigateOrderListPage(true);
  };

  const openFeedbackModal = (type = "Review") => {
    if (!guestVerification || !guestDetails) {
      setShowGuestVerify(true);
      showToast("danger", "Please verify your mobile number first");
      return;
    }
    setFeedbackType(type);
    setShowReportModal(true);
  };

  const handleGuestFeedback = async (comments) => {
    if (!guestDetails) return showToast("danger", "Please verify first");
    if (!comments?.trim()) return showToast("danger", "Please enter your message");
    setIsLoading(true);
    const res = await guestControl.addGuestFeedback({
      guestId: guestDetails._id,
      comments: comments.trim(),
      name: guestDetails.name,
      roomNumber: guestDetails.roomNumber,
      types: feedbackType,
    });
    setIsLoading(false);
    if (res.success) {
      setShowReportModal(false);
      showToast("success", `${feedbackType} submitted successfully`);
    } else {
      showToast("danger", res.message || "Unable to submit");
    }
  };

  return {
    category, hotelDetails, guestDetails, selectRoom, activeCategory, cart, cartCount, showAddBTN, showGuestVerify,
    navigateCartPage, totalAmount, guestVerification, showAlertmentModal, guestOrderList, navigateOrderListPage,
    showReportModal, feedbackType, orderPlaced, toast, isLoading,
    setShowReportModal, setNavigateOrderListPage, setShowAlertmentModal, setTotalAmount, handlefetchOrderList,
    setNavigateCartage, setShowGuestVerify, setGuestVerification, handleAddBTN, addToCart, increaseQty, decreaseQty,
    setCart, getQty, setActiveCategory, setSelectRoom, getActiveFoods, handleGotoCartPage, handleGuestVerify,
    handleGuestOrder, openFeedbackModal, handleGuestFeedback,
  };
};
