import { api } from "../api/axios.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const guestController = ({ triggerToast }) => {
  const { showLoading, hideLoading } = useLoading();

  const getAllGuestDetails = async () => {
    showLoading("Getting guest details...");
    try {
      const res = await api.get("/guest/guests");
      return res.data;
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Failed to load guests",
      });
      return [];
    } finally {
      hideLoading();
    }
  };

  const getInvoiceGuests = async () => {
    showLoading("Getting invoice data...");
    try {
      const res = await api.get("/guest/guestWithInvoice");
      return res.data;
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Failed to load invoice data",
      });
      return [];
    } finally {
      hideLoading();
    }
  };

  const updatePaymentStatus = async (guestId) => {
    showLoading("Updating payment status...");
    try {
      const res = await api.patch(`/guest/updatePaymentStatus/${guestId}`);
      triggerToast({ type: "success", message: res.data.message });
      await getInvoiceGuests();
    } catch (err) {
      triggerToast({
        type: "danger",
        message:
          err.response?.data?.message || "Failed to update payment status",
      });
    } finally {
      hideLoading();
    }
  };

  const updateStayStatus = async (guestId) => {
    showLoading("Updating stay status...");
    try {
      const res = await api.patch(`/guest/updateStayStatus/${guestId}`);
      triggerToast({ type: "success", message: res.data.message });
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Failed to update stay status",
      });
    } finally {
      hideLoading();
    }
  };

  const addnewGuest = async (guestDetails) => {
    showLoading("Adding new Guest...");
    try {
      const res = await api.post("/guest/addGuest", {
        name: guestDetails.name,
        mobile: guestDetails.mobile,
        email: guestDetails.email,
        roomNumber: guestDetails.roomNumber,
        guests: guestDetails.guests,
        checkIn: guestDetails.checkIn,
        checkOut: guestDetails.checkOut,
        isStay: guestDetails.isStay,
        amount: guestDetails.amount,
        payment: guestDetails.payment,
      });
      triggerToast({
        type: "success",
        message: res.data?.message || "Added new guest successfully",
      });
      return true;
    } catch (error) {
      triggerToast({
        type: "danger",
        message: error.response?.data?.message || "Failed to load guests",
      });
      return false;
    } finally {
      hideLoading();
    }
  };

  // Delete guest and ALL related data (orders, reviews, invoices)
  const deleteGuestAllData = async (guestId, toast) => {
    showLoading("Deleting guest and all related data...");
    try {
      const res = await api.delete(`/guest/deleteGuest/${guestId}`);
      (toast || triggerToast)({
        type: "success",
        message: res.data?.message || "Guest deleted successfully",
      });
      return true;
    } catch (err) {
      (toast || triggerToast)({
        type: "danger",
        message: err.response?.data?.message || "Failed to delete guest",
      });
      return false;
    } finally {
      hideLoading();
    }
  };

  const deleteGuest = async (guestId) => {
    showLoading("Deleting invoice record...");
    try {
      const res = await api.delete(`/guest/deleteGuest/${guestId}`);
      triggerToast({
        type: "success",
        message: res.data?.message || "Deleted successfully",
      });
      return true;
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Failed to delete",
      });
      return false;
    } finally {
      hideLoading();
    }
  };

  return {
    getAllGuestDetails,
    getInvoiceGuests,
    updatePaymentStatus,
    updateStayStatus,
    addnewGuest,
    deleteGuestAllData,
    deleteGuest,
  };
};
