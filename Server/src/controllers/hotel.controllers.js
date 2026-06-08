import HotelModel from "../models/hotel.model.js";

export const profileDetails = async (req, res) => {
  try {
    const { mobile, hotel, address } = req.body;
    const user = req.user;

    await HotelModel.updateOne(
      { userId: user.id },
      {
        $set: {
          user: user.name,
          email: user.email,
          mobile,
          hotel,
          address,
        },
        $setOnInsert: {
          userId: user.id,
          rooms: 5,
          isSubscripe: false,
        },
      },
      { upsert: true },
    );

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const userDetails = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await HotelModel.findOne({ userId });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const allUserDetails = async (req, res) => {
  const user = req.user;
  try {
    if (user.isAdmin) {
      const users = await HotelModel.find({});
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setRoom = async (req, res) => {
  const { rooms } = req.body;
  const userId = req.user.id;
  try {
    const updatedProfile = await HotelModel.findOneAndUpdate(
      { userId, isSubscripe: true },
      { $set: { rooms } },
      { new: true },
    );

    if (!updatedProfile) {
      return res
        .status(400)
        .json({ message: "Your subscription has expired." });
    }
    res.status(200).json({ message: "Rooms updated", data: updatedProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Subscripe = async (req, res) => {
  const { isAdmin } = req.user;
  const { hotelId, planDetails, updation } = req.body;

  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  const today = new Date();
  const activeDate = today.toISOString().split("T")[0];

  const expiry = new Date(today);
  expiry.setMonth(expiry.getMonth() + Number(planDetails));
  const deActiveDate = expiry.toISOString().split("T")[0];

  try {
    if (updation) {
      const updatedHotel = await HotelModel.findByIdAndUpdate(
        hotelId,
        {
          $set: { isSubscripe: true },
          $push: {
            subcripedHistory: {
              planDetails: `${planDetails} Months`,
              activeDate,
              deActiveDate,
            },
          },
        },
        { new: true },
      );

      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      return res.status(200).json({
        message: "Subscription activated successfully",
        data: updatedHotel,
      });
    } else {
      const hotel = await HotelModel.findById(hotelId);

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const lastActiveDate =
        hotel.subcripedHistory.length > 0
          ? hotel.subcripedHistory[hotel.subcripedHistory.length - 1].activeDate
          : activeDate;

      const updatedHotel = await HotelModel.findByIdAndUpdate(
        hotelId,
        {
          $set: { rooms: 5, isSubscripe: false },
          $push: {
            subcripedHistory: {
              planDetails: "Deactivated",
              activeDate: lastActiveDate,
              deActiveDate: activeDate,
            },
          },
        },
        { new: true },
      );

      return res.status(200).json({
        message: "Hotel unsubscribed successfully and recorded in history.",
        data: updatedHotel,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error changing subscription status",
      error: e.message,
    });
  }
};
