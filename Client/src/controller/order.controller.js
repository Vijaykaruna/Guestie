import { api } from "../api/axios.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const orderController = ({ triggerToast }) => {
  const { showLoading, hideLoading } = useLoading();

  const getOrdersList = async () => {
    showLoading("Getting order details...");
    try {
      const orders = await api.get("/order/ordersList");
      return orders.data;
    } catch (err) {
      triggerToast({ type: "danger", message: err.response?.data?.message });
      return null;
    } finally {
      hideLoading();
    }
  };

  const updateOrderStatusById = async (orderId, status, rejectionReason = "") => {
    showLoading("Updating order...");
    try {
      await api.patch(
        "/order/updateStatus",
        { status, rejectionReason },
        { params: { _id: orderId } },
      );
      triggerToast({ type: "success", message: "Successfully updated" });
      await getOrdersList();
    } catch (error) {
      triggerToast({ type: "danger", message: error.response?.data?.message || "Failed to update" });
    } finally {
      hideLoading();
    }
  };

  const deleteOrders = async (ids) => {
    showLoading("Deleting orders...");
    try {
      const res = await api.delete("/order/deleteOrders", { data: { ids } });
      triggerToast({ type: "success", message: res.data?.message || "Deleted successfully" });
      return true;
    } catch (err) {
      triggerToast({ type: "danger", message: err.response?.data?.message || "Failed to delete" });
      return false;
    } finally {
      hideLoading();
    }
  };

  return { getOrdersList, updateOrderStatusById, deleteOrders };
};