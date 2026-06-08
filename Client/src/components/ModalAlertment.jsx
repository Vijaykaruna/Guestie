import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal as AlertModal, Form } from "react-bootstrap";

const ModalAlertment = ({ user, type, onClose, onChange }) => {
  const [plan, setPlan] = useState("1");

  return (
    <AlertModal show onHide={onClose}>
      <AlertModal.Header closeButton>
        <AlertModal.Title>Confirmation Alert</AlertModal.Title>
      </AlertModal.Header>
      {type === "payment" ? (
        <AlertModal.Body>
          <>
            <p>
              <span className="fw-bold">Guest Name:</span> {user.name}
            </p>
            <p>
              <span className="fw-bold">Mobile Number:</span> {user.mobile}
            </p>
            <p>
              <span className="fw-bold">Room Number:</span>
              {user.roomNumber}
            </p>
            <hr />
            <p>
              <span className="fw-bold">💰 Total Amount to be Paid:</span>₹
              {user.totalAmount.toFixed(2)}
            </p>
          </>
          <Button variant="success" onClick={() => onChange(user._id)}>
            Mark as Paid
          </Button>
        </AlertModal.Body>
      ) : type === "subscribe" ? (
        <AlertModal.Body className="text-center">
          <div>
            <p className="fw-bold text-center border bg-body-secondary ">
              Subscription
            </p>
            <p className="text-center font-monospace">
              "Once the payment is successfully completed, update the
              subscription status accordingly."
            </p>
            <p className="text-center text-danger fst-italic">
              Thank you for Conforming!
            </p>
            <p>
              <strong>{user.user}</strong> &nbsp;|&nbsp; {user.mobile}
            </p>
            <Form.Group className="my-3">
              <Form.Label className="fw-semibold">Choose Plan</Form.Label>
              <Form.Select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="1">1 Month</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </Form.Select>
            </Form.Group>
          </div>
          <Button
            variant="success"
            onClick={() => {
              onChange(user._id, plan);
              setPlan("0");
            }}
          >
            Activate user subcription
          </Button>
        </AlertModal.Body>
      ) : (
        <AlertModal.Body className="text-center">
          <div>
            <p className="fw-bold text-center border bg-body-secondary ">
              Subscription
            </p>
            <p className="text-center font-monospace">
              "De-Activate the subcription manually."
            </p>
            <p className="text-center text-danger fst-italic">
              Thank you for Conforming!
            </p>
            <p>
              <strong>{user.user}</strong> &nbsp;|&nbsp; {user.mobile}
            </p>
          </div>
          <Button variant="danger" onClick={() => onChange(user._id, 0)}>
            De-Activate user subcription
          </Button>
        </AlertModal.Body>
      )}
      <AlertModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </AlertModal.Footer>
    </AlertModal>
  );
};

export default ModalAlertment;
