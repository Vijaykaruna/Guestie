import { guestApi } from "../api/axios.js";

export const publicGuestController = (userId) => {
  const getHotelByUser = async () => {
    try {
      const res = await guestApi.get(`/guest/hotel/${userId}`);
      return res.data;
    } catch (err) {
      console.error("Hotel load failed", err);
      return null;
    }
  };

  const getGuestDetailsByUser = async (mobile, roomNumber) => {
    try {
      const res = await guestApi.post(`/guest/guest/${userId}`, { mobile, roomNumber });
      return res.data.guest;
    } catch (error) {
      console.error("Guest verification failed", error);
      return null;
    }
  };

  const getFoodsByUser = async () => {
    try {
      const res = await guestApi.get(`/guest/foods/${userId}`);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("Food load failed", error);
      return [];
    }
  };

  const guestOrder = async (payload) => {
    try {
      const res = await guestApi.post("/guest/order", payload);
      return res.data;
    } catch (err) {
      console.error("Order failed", err);
      return { success: false, message: err?.response?.data?.message || "Order failed" };
    }
  };

  const getGuestOrdersList = async (guestId) => {
    try {
      const res = await guestApi.get(`/guest/order/list/${guestId}`, { params: { userId } });
      return Array.isArray(res.data?.data) ? res.data.data : [];
    } catch (err) {
      console.error("Order list load failed", err);
      return [];
    }
  };

  const addGuestFeedback = async ({ guestId, comments, name, roomNumber, types }) => {
    try {
      const endpoint = types === "Report" ? "/review/AddReport" : "/review/AddReview";
      const res = await guestApi.post(endpoint, {
        userId,
        guestId,
        comments,
        name,
        roomNumber,
        types,
        date: new Date().toLocaleString(),
      });
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Feedback failed", error);
      return { success: false, message: error?.response?.data?.message || "Unable to submit" };
    }
  };

  return {
    getHotelByUser,
    getFoodsByUser,
    guestOrder,
    getGuestDetailsByUser,
    getGuestOrdersList,
    addGuestFeedback,
  };
};
