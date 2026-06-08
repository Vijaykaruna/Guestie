import { Modal as GuestAlert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaCheckCircle } from "react-icons/fa";

const GuestAlertmentModal = ({ useGuest }) => {
  return (
    <GuestAlert show={useGuest.showAlertmentModal} onHide={() => useGuest.setShowAlertmentModal(false)} backdrop="static" keyboard={false} centered>
      <GuestAlert.Header closeButton className="guest-modal-header">
        <GuestAlert.Title>Confirm Your Order</GuestAlert.Title>
      </GuestAlert.Header>
      <GuestAlert.Body className="text-center">
        <FaCheckCircle className="confirm-icon" />
        <p className="fw-bold fs-5 mb-1">Total Amount: Rs. {useGuest.totalAmount.toFixed(2)}</p>
        <p className="text-secondary mb-0">You can pay when you check out. This amount will be added to your room bill.</p>
      </GuestAlert.Body>
      <GuestAlert.Footer>
        <Button variant="outline-secondary" onClick={() => useGuest.setShowAlertmentModal(false)}>Close</Button>
        <Button variant="danger" onClick={useGuest.handleGuestOrder} disabled={useGuest.isLoading}>{useGuest.isLoading ? "Ordering..." : "Place Order"}</Button>
      </GuestAlert.Footer>
    </GuestAlert>
  );
};

export default GuestAlertmentModal;
