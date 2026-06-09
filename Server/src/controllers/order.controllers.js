import OrderListModel from "../models/order.model.js";

export const ordersList = async (req, res) => {
  const userId = req.user.id;

  try {
    const OrderFoods = await OrderListModel.aggregate([
      {
        $match: { userId },
      },
      {
        $addFields: {
          statusPriority: {
            $cond: [{ $eq: ["$status", "Pending"] }, 1, 2],
          },
        },
      },

      {
        $sort: {
          statusPriority: 1,
          roomNumber: 1,
        },
      },

      {
        $project: {
          statusPriority: 0,
        },
      },
    ]);

    res.status(200).json(OrderFoods);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateStatus = async (req, res) => {
  const { _id } = req.query;
  const { status, rejectionReason } = req.body;
  const userId = req.user.id;

  try {
    const updatedOrder = await OrderListModel.findOneAndUpdate(
      { _id, userId },
      {
        $set: {
          status,
          rejectionReason: status === "Rejected" ? String(rejectionReason || "Not available").trim() : "",
          rejectedAt: status === "Rejected" ? new Date().toLocaleString() : "",
        },
      },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
export const deleteOrders = async (req, res) => {
  const userId = req.user.id;
  const { ids } = req.body; // array of order IDs
  try {
    await OrderListModel.deleteMany({ _id: { $in: ids }, userId });
    res.status(200).json({ message: "Orders deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete orders" });
  }
};