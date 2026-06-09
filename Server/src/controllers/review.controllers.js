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

export const deleteReview = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  try {
    const deleted = await ReviewModel.findOneAndDelete({ _id: reviewId, userId });
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};
