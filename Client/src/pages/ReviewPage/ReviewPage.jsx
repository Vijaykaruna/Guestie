import { useEffect } from "react";

const ReviewPage = ({ reviewControl }) => {
  const { reviewList, getAllReviews } = reviewControl;
  useEffect(() => { getAllReviews(); }, []);
  const reviews = reviewList.filter((item) => item.types === "Review").length;
  const reports = reviewList.length - reviews;

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card"><div><span className="admin-kicker">Guest Voice</span><h1>Reviews & Reports</h1><p>Read guest feedback, identify service issues, and improve food ordering experience.</p></div></div>
      <div className="admin-info-grid"><div className="admin-info-card"><span>Total Feedback</span><strong>{reviewList.length}</strong><p>All messages from guests.</p></div><div className="admin-info-card"><span>Reviews</span><strong>{reviews}</strong><p>Positive or general feedback.</p></div><div className="admin-info-card"><span>Reports</span><strong>{reports}</strong><p>Issues that need attention.</p></div></div>
      <div className="admin-content-card">
        <div className="guest-section-title"><div><span>Messages</span><h2>Guest Feedback</h2></div><p className="text-secondary m-0">Reports are highlighted in red for quick action.</p></div>
        <div className="admin-feedback-list">
          {reviewList.length ? reviewList.map((items) => (
            <div key={items._id} className={`admin-feedback-card ${items.types === "Review" ? "" : "danger"}`}>
              <div className="d-flex flex-wrap justify-content-between gap-2"><strong>{items.name}</strong><span>{items.date}</span><strong>Room No: {items.roomNumber}</strong></div>
              <p>“{items.message}”</p>
            </div>
          )) : <p className="text-center text-secondary py-4">No reviews</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
