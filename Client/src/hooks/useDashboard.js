import TotalRooms from "../assets/totalRooms.png";
import TotalSales from "../assets/totalSale.png";
import TotalOrders from "../assets/totalOrder.png";
import { useEffect, useState } from "react";

export const useDashboard = ({
  hotelControl,
  orderControl,
  triggerToast,
  openModal,
}) => {
  const [ordersList, setOrdersList] = useState([]);
  const [pendingOrdersList, setPendingOrdersList] = useState([]);
  const [deliveredOrdersList, setDelevedOrderList] = useState([]);

  const getAllOrders = async () => {
    const orders = await orderControl.getOrdersList();
    setOrdersList(orders);
  };

  const [stats, setStats] = useState({
    rooms: 0,
    delivered: 0,
    totalSales: 0,
  });

  const dashTable = [
    {
      title: "Total Rooms",
      img: TotalRooms,
      values: stats.rooms,
      label: "Only 5 Rooms available",
      color: "success",
    },
    {
      title: "Total Orders",
      img: TotalOrders,
      values: `${stats.delivered}`,
      label: "1.5% Up from past week",
      color: "success",
    },
    {
      title: "Total Sales",
      img: TotalSales,
      values: `₹${stats.totalSales}`,
      label: "4.3% Down from yesterday",
      color: "danger",
    },
  ];

  const [showModalRoom, setShowModalRoom] = useState(false);

  const handleSaveRooms = (newRooms) => {
    if (!hotelControl.hotelDetails?.isSubscripe) {
      triggerToast({
        type: "danger",
        message: "Please activate subscription to update rooms",
      });
      return;
    } else {
      hotelControl.updateHotelRooms(newRooms);
      hotelControl.getHotelDetails();
      setShowModalRoom(false);
    }
  };

  const showOrderById = (orderId) => {
    const order = ordersList.find((order) => order._id === orderId);
    openModal("Ordered Food list", order.foods, "food");
  };

  useEffect(() => {
    const pending = ordersList.filter((o) => o.status === "Pending");
    const delivered = ordersList.filter((o) => o.status === "Delivered");

    setPendingOrdersList(pending);
    setDelevedOrderList(delivered);

    const totalSales = delivered.reduce(
      (sum, order) => sum + (order.amount || 0),
      0,
    );

    setStats({
      rooms: hotelControl.hotelDetails?.rooms || 0,
      delivered: delivered.length,
      totalSales,
    });
  }, [ordersList, hotelControl.hotelDetails]);

  return {
    dashTable,
    showModalRoom,
    ordersList,
    pendingOrdersList,
    deliveredOrdersList,
    setShowModalRoom,
    handleSaveRooms,
    showOrderById,
    getAllOrders,
  };
};
