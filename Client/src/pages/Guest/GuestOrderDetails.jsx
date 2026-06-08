import logo from "../../assets/logo.png";
import GuestFeedbackModal from "../../components/GuestFeedbackModal.jsx";
import GuestToastModal from "../../components/Guest.Toast.jsx";
import { FaArrowLeft, FaHome, FaStar } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

const GuestOrderDetails = ({ guest }) => {
  const handleGoBack = () => guest.setNavigateOrderListPage(false);
  const handleGoBackHome = () => {
    guest.setNavigateCartage(false);
    guest.setNavigateOrderListPage(false);
  };

  const total = guest?.guestOrderList?.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0) || 0;

  return (
    <main className="guest-page">
      <header className="guest-topbar container">
        <a href="#profile" className="guest-brand"><img src={logo} alt="logo" /><span>My Orders</span></a>
        <div className="guest-actions">
          <button className="guest-outline-btn" onClick={() => guest.openFeedbackModal("Report")}><MdReportProblem /> Report</button>
          <button className="guest-outline-btn" onClick={() => guest.openFeedbackModal("Review")}><FaStar /> Review</button>
        </div>
      </header>

      {guest.orderPlaced && (
        <section className="container guest-thanks-card">
          <h1>Thanks for ordering!</h1>
          <p>Your order was placed successfully. You can share a review or report an issue using the buttons above.</p>
        </section>
      )}

      <section className="container guest-summary-card">
        <div className="guest-section-title">
          <div><span>Order History</span><h2>Your food orders</h2></div>
          <strong>Rs. {total.toFixed(2)}</strong>
        </div>

        {guest?.guestOrderList?.length === 0 ? (
          <div className="guest-empty">No orders found.</div>
        ) : (
          <div className="guest-order-history">
            {guest.guestOrderList.map((order) => (
              <article className="guest-order-card" key={order._id}>
                <div className="guest-order-head">
                  <div><strong>Room {order.roomNumber}</strong><span>{order.date}</span></div>
                  <span className={`guest-status ${order.status === "Rejected" ? "rejected" : ""}`}>{order.status}</span>
                </div>
                {order.status === "Rejected" && order.rejectionReason && (
                  <div className="guest-reject-note"><b>Rejected reason:</b> {order.rejectionReason}</div>
                )}
                {order.foods?.map((food, index) => (
                  <div className="guest-order-line" key={`${order._id}-${index}`}>
                    <span>{food.title}</span>
                    <small>Rs. {food.price} × {food.quantity}</small>
                    <strong>Rs. {(food.price * food.quantity).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="guest-order-total">Total: Rs. {Number(order.totalAmount || 0).toFixed(2)}</div>
              </article>
            ))}
          </div>
        )}

        <div className="guest-page-actions">
          <button className="guest-outline-btn" onClick={handleGoBack}><FaArrowLeft /> Back</button>
          <button className="guest-place-order" onClick={handleGoBackHome}><FaHome /> Back to Food</button>
        </div>
      </section>

      {guest.toast && <div className="guest-toast-wrap"><GuestToastModal key={guest.toast.id} type={guest.toast.type} message={guest.toast.message} /></div>}
      {guest.showReportModal && <GuestFeedbackModal guest={guest} />}
    </main>
  );
};

export default GuestOrderDetails;
