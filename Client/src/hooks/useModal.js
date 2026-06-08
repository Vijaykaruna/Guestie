import { useEffect, useState } from "react";

export const useModalUser = ({ hotelControl }) => {
  const { updateHotelDetails } = hotelControl;

  const [mobile, setMobile] = useState("");
  const [hotel, setHotel] = useState("");
  const [address, setAddress] = useState("");

  const formFields = [
    {
      id: "mobile",
      name: "mobile",
      label: "Mobile",
      type: "tel",
      placeholder: "Mobile Number",
      value: mobile,
      onChange: (e) => setMobile(e.target.value),
    },
    {
      id: "hotel",
      name: "hotel",
      label: "Hotel Name",
      type: "text",
      placeholder: "Hotel Name...",
      value: hotel,
      onChange: (e) => setHotel(e.target.value),
    },
    {
      id: "address",
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Address...",
      value: address,
      onChange: (e) => setAddress(e.target.value),
    },
  ];

  const updateHotel = () => {
    updateHotelDetails({
      mobile,
      hotel,
      address,
    });
  };

  return {
    formFields,
    updateHotel,
  };
};

export const useModalTable = () => {
  const [modal, setModal] = useState(null);

  const openModal = (title, content, type) => {
    setModal({ title, content, type });
  };

  return { modal, openModal, onClose: () => setModal(null) };
};

export const useModalAddFood = (editingFood) => {
  const [addFoodDetails, setAddFoodDetails] = useState({
    title: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (editingFood) {
      setAddFoodDetails({
        title: editingFood.title || "",
        category: editingFood.category || "",
        price: editingFood.price || 0,
        description: editingFood.description || "",
        image: editingFood.image || "",
        isAvailable: editingFood.isAvailable ?? true,
      });
    } else {
      setAddFoodDetails({
        title: "",
        category: "",
        price: 0,
        description: "",
        image: "",
        isAvailable: true,
      });
    }
  }, [editingFood]);

  return { addFoodDetails, setAddFoodDetails };
};

export const useModalAddGuest = ({ useGuest, triggerToast }) => {
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    roomNumber: 0,
    guests: 1,
    checkIn: "",
    checkOut: "",
    isStay: "Yes",
    payment: "Pending",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setGuestDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const formFields = [
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      value: guestDetails.name,
      onChange: handleChange,
    },
    {
      id: "mobile",
      name: "mobile",
      label: "Mobile",
      type: "tel",
      placeholder: "Mobile Number",
      value: guestDetails.mobile,
      onChange: handleChange,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      value: guestDetails.email,
      onChange: handleChange,
    },
    {
      id: "roomNumber",
      name: "roomNumber",
      label: "Room Number",
      type: "number",
      placeholder: "Room Number",
      value: guestDetails.roomNumber,
      onChange: handleChange,
    },
    {
      id: "guests",
      name: "guests",
      label: "Guests",
      type: "number",
      placeholder: "Number of Guests",
      value: guestDetails.guests,
      onChange: handleChange,
    },
    {
      id: "checkIn",
      name: "checkIn",
      label: "Check In",
      type: "date",
      value: guestDetails.checkIn,
      onChange: handleChange,
    },
    {
      id: "checkOut",
      name: "checkOut",
      label: "Check Out",
      type: "date",
      value: guestDetails.checkOut,
      onChange: handleChange,
    },
  ];

  const newGuestDetails = () => {
    if (!guestDetails.roomNumber) {
      triggerToast({
        type: "danger",
        message: "Please select a room number",
      });
      return;
    }
    useGuest.handleAddnewGuest(guestDetails);
  };

  return { guestDetails, formFields, newGuestDetails };
};
