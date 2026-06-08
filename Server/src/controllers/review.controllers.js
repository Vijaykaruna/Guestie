import ReviewModel from "../models/review.model.js";

//app.post("/AddReview",
export const addReview = async (req, res) => {
  const { userId, guestId, comments, name, date, roomNumber, types } = req.body;
  try {
    const reviewDoc = await ReviewModel.create({
      userId,
      guestId,
      message: comments,
      name,
      date,
      roomNumber,
      types,
    });

    res.status(200).json({ message: "Review added successfully", reviewDoc });
  } catch (e) {
    res.status(400).json(e);
  }
};

//app.post("/AddReport",
export const addReport = async (req, res) => {
  const { userId, guestId, comments, name, date, roomNumber, types } = req.body;
  try {
    const reviewDoc = await ReviewModel.create({
      userId,
      guestId,
      message: comments,
      name,
      date,
      roomNumber,
      types,
    });

    res.status(200).json({ message: "Review added successfully", reviewDoc });
  } catch (e) {
    res.status(400).json(e);
  }
};

//app.get("/Reviews",
export const reviews = async (req, res) => {
  const userId = req.user.id;
  try {
    const reviews = await ReviewModel.find({ userId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(error).json(error);
  }
};
