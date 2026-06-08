import { useState } from "react";
import { api } from "../api/axios.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const hotelController = ({ triggerToast }) => {
  const { showLoading, hideLoading } = useLoading();

  const [hotelDetails, setHotelDetails] = useState(null);

  const [allHotelDetails, setAllHotelDetails] = useState([]);

  const getHotelDetails = async () => {
    showLoading("Loading hotel details...");
    try {
      const res = await api.get("/hotel/myhotelDetails");
      setHotelDetails(res.data);
      return res.data;
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };

  const updateHotelDetails = async (payload) => {
    showLoading("Saving profile...");
    try {
      const res = await api.post("/hotel/hotelDetails", payload);

      triggerToast({
        type: "success",
        message: res.data.message || "Saved successfully",
      });
      await getHotelDetails();
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };

  const updateHotelRooms = async (newRoom) => {
    showLoading("Updating room...");
    try {
      await api.patch("/hotel/updateRooms", { rooms: newRoom });
      triggerToast({
        type: "success",
        message: "Rooms updated successfully",
      });
      await getHotelDetails();
    } catch (e) {
      triggerToast({
        type: "danger",
        message: e.response?.data?.message || "Failed to update rooms",
      });
    } finally {
      hideLoading();
    }
  };

  const getAllHotelDetails = async () => {
    showLoading("Loading hotel details...");
    try {
      const res = await api.get("/hotel/allhotelDetails");
      setAllHotelDetails(res.data);
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };

  const updateHotelSubcription = async (hotelId, planDetails, updation) => {
    showLoading("Updating subcription...");
    try {
      await api.post("/hotel/updateSubscripe", {
        hotelId,
        planDetails,
        updation,
      });
      triggerToast({
        type: "success",
        message: "Subcription updated successfully",
      });
      await getAllHotelDetails();
    } catch (e) {
      triggerToast({
        type: "danger",
        message: e.response?.data?.message || "Failed to update subcription",
      });
    } finally {
      hideLoading();
    }
  };

  return {
    hotelDetails,
    allHotelDetails,
    getAllHotelDetails,
    getHotelDetails,
    updateHotelDetails,
    updateHotelRooms,
    updateHotelSubcription,
  };
};
