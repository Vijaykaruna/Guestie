import GuestModel from "../models/guest.model.js";
import OrderListModel from "../models/order.model.js";
import HotelModel from "../models/hotel.model.js";
import FoodModel from "../models/food.model.js";

export const addGuest = async (req, res) => {
  const userId = req.user.id;
  try {
    const payload = {
      userId,
      name: String(req.body.name || "").trim(),
      mobile: String(req.body.mobile || "").trim(),
      email: String(req.body.email || "").trim(),
      roomNumber: Number(req.body.roomNumber),
      guests: Number(req.body.guests || 1),
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      isStay: req.body.isStay === "No" ? "No" : "Yes",
      payment: req.body.payment || "Pending",
      amount: Number(req.body.amount || 0),
    };

    if (!payload.name || !payload.mobile || !payload.roomNumber || !payload.checkIn || !payload.checkOut) {
      return res.status(400).json({ message: "Name, mobile, room, check-in and check-out are required" });
    }

    const savedGuest = await GuestModel.create(payload);
    res.status(200).json({ message: "Added new guest successfully", id: savedGuest._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add guest" });
  }
};

export const updateStay = async (req, res) => {
  const userId = req.user.id;
  const guestId = req.params.guestId;
  try {
    const updatedGuest = await GuestModel.findOneAndUpdate(
      { _id: guestId, userId, isStay: { $ne: "No" } },
      { isStay: "No" },
      { new: true },
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json({
      message: "Updated stay status successfully",
      data: updatedGuest,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update stay" });
  }
};

export const guestList = async (req, res) => {
  const userId = req.user.id;

  try {
    const guests = await GuestModel.aggregate([
      { $match: { userId } },

      {
        $addFields: {
          stayOrder: {
            $cond: [{ $eq: ["$isStay", "Yes"] }, 0, 1],
          },
        },
      },

      {
        $sort: {
          stayOrder: 1,
          roomNumber: 1,
        },
      },

      {
        $project: {
          stayOrder: 0,
        },
      },
    ]);

    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: "Failed to load guest list" });
  }
};

export const guestDetails = async (req, res) => {
  const { mobile, roomNumber } = req.body;
  const { userId } = req.params;

  try {
    const guest = await GuestModel.findOne({ userId, mobile, roomNumber, isStay: "Yes" });

    if (!guest) {
      return res.status(404).json({ error: "Guest not found or stay already closed" });
    }

    res.status(200).json({ guest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const paymentStatus = async (req, res) => {
  const guestId = req.params.guestId;
  const userId = req.user.id;
  try {
    const updatedGuest = await GuestModel.findOneAndUpdate(
      {
        _id: guestId,
        userId,
        payment: "Pending",
      },
      {
        $set: {
          payment: "Paid",
          isStay: "No",
        },
      },
      { new: true },
    );

    if (!updatedGuest) {
      return res.status(404).json({
        message: "Guest not found",
      });
    }

    res.status(200).json({
      message: "Payment status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failure to update payment status",
    });
  }
};

export const getInvoiceGuests = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = await OrderListModel.aggregate([
      {
        $match: {
          userId,
          status: "Delivered",
        },
      },

      {
        $addFields: {
          guestObjId: { $toObjectId: "$guestId" },
        },
      },

      {
        $lookup: {
          from: "guest_details",
          localField: "guestObjId",
          foreignField: "_id",
          as: "guest",
        },
      },

      { $unwind: "$guest" },
      { $unwind: "$foods" },

      {
        $project: {
          guestId: "$guest._id",

          name: "$guest.name",
          mobile: "$guest.mobile",
          roomNumber: "$guest.roomNumber",
          payment: "$guest.payment",

          date: "$date",

          title: "$foods.title",
          quantity: "$foods.quantity",
          price: "$foods.price",

          itemAmount: {
            $multiply: ["$foods.price", "$foods.quantity"],
          },
        },
      },

      {
        $group: {
          _id: "$guestId",

          name: { $first: "$name" },
          mobile: { $first: "$mobile" },
          roomNumber: { $first: "$roomNumber" },
          payment: { $first: "$payment" },

          orders: {
            $push: {
              title: "$title",
              date: "$date",
              quantity: "$quantity",
              price: "$price",
              amount: "$itemAmount",
            },
          },

          totalAmount: { $sum: "$itemAmount" },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invoice failed" });
  }
};

export const getHotelByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const hotel = await HotelModel.findOne({ userId });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFoodsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const foods = await FoodModel.find({
      userId,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addOrderFood = async (req, res) => {
  const { guestId, mobile, name, roomNumber, amount, date, foods, userId } =
    req.body;

  try {
    const guestOrder = await OrderListModel.create({
      userId,
      guestId,
      mobile,
      name,
      status: "Pending",
      amount,
      roomNumber,
      date,
      foods: foods.map((food) => ({
        title: food.title,
        price: food.price,
        quantity: food.quantity,
      })),
    });

    res
      .status(201)
      .json({ message: "Order placed", success: true, order: guestOrder });
  } catch (error) {
    console.error("Error while creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export const getGuestOrderFoods = async (req, res) => {
  const guestId = req.params.guestId;
  const userId = req.query.userId;

  try {
    const result = await OrderListModel.aggregate([
      {
        $match: {
          guestId,
          userId,
        },
      },

      {
        $group: {
          _id: "$_id",
          date: { $first: "$date" },
          roomNumber: { $first: "$roomNumber" },
          status: { $first: "$status" },
          rejectionReason: { $first: "$rejectionReason" },
          rejectedAt: { $first: "$rejectedAt" },
          foods: { $first: "$foods" },
          totalAmount: { $first: "$amount" },
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({
        message: "No food orders found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteGuestAllData = async (req, res) => {
  const userId = req.user.id;
  const guestId = req.params.guestId;
  try {
    // Delete all orders of this guest
    await OrderListModel.deleteMany({ guestId, userId });
    // Delete the guest record
    const deletedGuest = await GuestModel.findOneAndDelete({ _id: guestId, userId });
    if (!deletedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }
    res.status(200).json({ message: "Guest and all related data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete guest data" });
  }
};
