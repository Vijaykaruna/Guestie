import { useState } from "react";
import { Modal as GuestVerify } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaMobileAlt, FaBed } from "react-icons/fa";

const ModalGuestVerify = ({ useGuest }) => {
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    useGuest.handleGuestVerify(useGuest.selectRoom, mobile);
  };

  return (
    <GuestVerify show={useGuest.showGuestVerify} onHide={() => useGuest.setShowGuestVerify(false)} centered>
      <form onSubmit={handleSubmit}>
        <GuestVerify.Header closeButton className="guest-modal-header">
          <GuestVerify.Title>Guest Verification</GuestVerify.Title>
        </GuestVerify.Header>
        <GuestVerify.Body className="guest-verify-body">
          <div className="verify-icon"><FaMobileAlt /></div>
          <p className="verify-subtitle">Verify your registered mobile number before placing the order.</p>
          <div className="verify-room"><FaBed /> Room No: <strong>{useGuest.selectRoom}</strong></div>
          <Form.Group className="mt-3 text-start">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter 10 digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              autoFocus
            />
          </Form.Group>
        </GuestVerify.Body>
        <GuestVerify.Footer>
          <Button variant="outline-secondary" onClick={() => useGuest.setShowGuestVerify(false)}>Cancel</Button>
          <Button variant="danger" type="submit" disabled={useGuest.isLoading}>{useGuest.isLoading ? "Verifying..." : "Verify & Continue"}</Button>
        </GuestVerify.Footer>
      </form>
    </GuestVerify>
  );
};

export default ModalGuestVerify;
