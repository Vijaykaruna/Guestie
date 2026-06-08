import Dosa from "../../assets/dosa.png";
import logo from "../../assets/logo.png";
import GuestAlertmentModal from "../../components/GuestAlertmentModal.jsx";
import GuestToastModal from "../../components/Guest.Toast.jsx";
import { FaArrowLeft } from "react-icons/fa";

const GuestOrderConformation = ({ guest }) => {
  const handleGoBack = () => {
    guest.setNavigateCartage(false);
    guest.setNavigateOrderListPage(false);
  };

  return (
    <main className="guest-page">
      <header className="guest-topbar container">
        <a href="#profile" className="guest-brand"><img src={logo} alt="logo" /><span>Order Summary</span></a>
        <button className="guest-outline-btn" onClick={handleGoBack}><FaArrowLeft /> Back</button>
      </header>

      <section className="container guest-summary-card">
        <div className="guest-section-title">
          <div><span>Cart</span><h2>Confirm your food order</h2></div>
          <strong>Rs. {guest.totalAmount.toFixed(2)}</strong>
        </div>

        <div className="guest-cart-list">
          {Object.values(guest.cart).map((food) => (
            <div className="guest-cart-item" key={food.foodId}>
              <img src={Dosa} alt={food.title} />
              <div>
                <h3>{food.title}</h3>
                <p>Rs. {food.price} × {food.quantity}</p>
              </div>
              <strong>Rs. {(food.quantity * food.price).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <div className="guest-bill-note">
          This amount will be added to your room bill and can be paid during checkout.
        </div>
        <button className="guest-place-order" onClick={() => guest.setShowAlertmentModal(true)}>Order Food</button>
      </section>

      {guest.toast && <div className="guest-toast-wrap"><GuestToastModal key={guest.toast.id} type={guest.toast.type} message={guest.toast.message} /></div>}
      {guest.showAlertmentModal && <GuestAlertmentModal useGuest={guest} />}
    </main>
  );
};

export default GuestOrderConformation;
