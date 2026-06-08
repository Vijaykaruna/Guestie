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
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };
  return { reviewList, getAllReviews };
};
