import { useState } from "react";

export const useOrderPage = ({ orderControl, openModal }) => {
  const [ordersList, setOrdersList] = useState([]);

  const getAllOrders = async () => {
    const orders = await orderControl.getOrdersList();
    setOrdersList(orders);
  };

  const showOrderById = (orderId) => {
    const order = ordersList.find((o) => o._id === orderId);
    openModal("Ordered Food list", order.foods, "food");
  };

  const updateOrderStatus = async(orderId, status, rejectionReason = "") => {
    await orderControl.updateOrderStatusById(orderId, status, rejectionReason);
    getAllOrders();
  };

  return { ordersList, getAllOrders, showOrderById, updateOrderStatus };
};
