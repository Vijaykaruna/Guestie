import { useParams } from "react-router-dom";
import Dosa from "../../assets/dosa.png";
import logo from "../../assets/logo.png";
import Form from "react-bootstrap/Form";
import { FaShoppingCart, FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { useGuest } from "../../hooks/useGuest.js";
import GuestToastModal from "../../components/Guest.Toast.jsx";
import ModalGuestVerify from "../../components/Guest.VerifyModal.jsx";
import GuestFeedbackModal from "../../components/GuestFeedbackModal.jsx";
import GuestOrderConformation from "./GuestOrderConformation.jsx";
import GuestOrderDetails from "./GuestOrderDetails.jsx";

const Guest = () => {
  const { userId } = useParams();
  const guest = useGuest(userId);

  if (guest.navigateCartPage) return <GuestOrderConformation guest={guest} />;
  if (guest.navigateOrderListPage) return <GuestOrderDetails guest={guest} />;

  const foods = guest.getActiveFoods(guest.activeCategory);

  return (
    <main className="guest-page">
      <header className="guest-topbar container">
        <a href="#" className="guest-brand">
          <img src={logo} alt="Hotel logo" />
          <span>{guest.hotelDetails?.hotel || "Guest Food Ordering"}</span>
        </a>
        <div className="guest-actions">
          <button className="guest-icon-btn" onClick={guest.handlefetchOrderList} title="My orders">
            <FaShoppingCart />
            {guest.cartCount > 0 && <span className="guest-badge">{guest.cartCount}</span>}
          </button>
          <button className="guest-outline-btn" onClick={() => guest.openFeedbackModal("Report")}>
            <MdReportProblem /> Report
          </button>
        </div>
      </header>

      <section className="guest-hero container">
        <div>
          <p className="guest-kicker">Scan • Select • Verify • Order</p>
          <h1>Order food directly to your room</h1>
          <p className="guest-hero-text">Choose your room number, add food with quantity, verify your registered mobile number, and place the order.</p>
        </div>
        <div className="guest-total-card">
          <span>Cart Total</span>
          <strong>Rs. {guest.totalAmount.toFixed(2)}</strong>
          <button className="btn btn-danger w-100 mt-2" onClick={guest.handleGotoCartPage} disabled={guest.cartCount === 0}>View Cart</button>
        </div>
      </section>

      <section className="container guest-controls-card">
        <div>
          <Form.Label>Food Category</Form.Label>
          <Form.Select value={guest.activeCategory} onChange={(e) => guest.setActiveCategory(e.target.value)}>
            {guest.category.map((c) => <option key={c.label} value={c.label}>{c.name}</option>)}
          </Form.Select>
        </div>
        <div>
          <Form.Label>Room Number</Form.Label>
          <Form.Select value={guest.selectRoom} onChange={(e) => guest.setSelectRoom(Number(e.target.value))}>
            <option value={0}>Select Room</option>
            {Array.from({ length: guest.hotelDetails?.rooms || 0 }, (_, i) => {
              const roomNumber = 100 + i;
              return <option key={roomNumber} value={roomNumber}>{roomNumber}</option>;
            })}
          </Form.Select>
        </div>
      </section>

      <section className="container guest-food-section">
        <div className="guest-section-title">
          <div>
            <span>Menu</span>
            <h2>{guest.activeCategory} Items</h2>
          </div>
          <p>{foods.length} items available</p>
        </div>

        {foods.length === 0 ? (
          <div className="guest-empty">No food items available in this category.</div>
        ) : (
          <div className="guest-food-grid">
            {foods.map((item) => {
              const qty = guest.getQty(item._id);
              return (
                <article className="guest-food-card" key={item._id}>
                  <img src={item.image || Dosa} alt={item.title} />
                  <div className="guest-food-body">
                    <div className="d-flex justify-content-between gap-2">
                      <h3>{item.title}</h3>
                      <span className="guest-price">Rs. {Number(item.price).toFixed(2)}</span>
                    </div>
                    <p className="guest-food-desc">{item.description || "Freshly prepared and delivered to your room."}</p>
                    {qty > 0 ? (
                      <div className="guest-qty-row">
                        <button onClick={() => guest.decreaseQty(item)}><FaMinus /></button>
                        <strong>{qty}</strong>
                        <button onClick={() => guest.increaseQty(item)}><FaPlus /></button>
                      </div>
                    ) : (
                      <button className="guest-add-btn" onClick={() => guest.handleAddBTN(item)}>Add to Cart</button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <div className="guest-bottom-cart">
        <button onClick={guest.handleGotoCartPage} disabled={guest.cartCount === 0}>
          <FaShoppingCart /> Go to Cart ({guest.cartCount}) • Rs. {guest.totalAmount.toFixed(2)}
        </button>
      </div>

      {guest.orderPlaced && (
        <button className="guest-review-float" onClick={() => guest.openFeedbackModal("Review")}><FaStar /> Review</button>
      )}
      {guest.toast && <div className="guest-toast-wrap"><GuestToastModal key={guest.toast.id} type={guest.toast.type} message={guest.toast.message} /></div>}
      {guest.showGuestVerify && <ModalGuestVerify useGuest={guest} />}
      {guest.showReportModal && <GuestFeedbackModal guest={guest} />}
    </main>
  );
};

export default Guest;
