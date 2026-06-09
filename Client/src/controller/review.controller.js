import { useState } from "react";
import { api } from "../api/axios.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const reviewController = ({ triggerToast }) => {
  const [reviewList, setReviewList] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const getAllReviews = async () => {
    showLoading("Loading review details...");
    try {
      const review = await api.get("/review/Reviews");
      setReviewList(review.data);
    } catch (err) {
      triggerToast({ type: "danger", message: err.response?.data?.message || "Something went wrong" });
    } finally {
      hideLoading();
    }
  };

  const deleteReview = async (reviewId) => {
    showLoading("Deleting review...");
    try {
      const res = await api.delete(`/review/delete/${reviewId}`);
      triggerToast({ type: "success", message: res.data?.message || "Review deleted" });
    } catch (err) {
      triggerToast({ type: "danger", message: err.response?.data?.message || "Failed to delete review" });
    } finally {
      hideLoading();
    }
  };

  return { reviewList, getAllReviews, deleteReview };
};
