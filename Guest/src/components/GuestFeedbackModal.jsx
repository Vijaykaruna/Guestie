import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const GuestFeedbackModal = ({ guest }) => {
  const [comments, setComments] = useState("");
  const type = guest.feedbackType || "Review";

  const handleSubmit = (e) => {
    e.preventDefault();
    guest.handleGuestFeedback(comments);
  };

  return (
    <Modal show={guest.showReportModal} onHide={() => guest.setShowReportModal(false)} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="guest-modal-header">
          <Modal.Title>{type === "Report" ? "Report an Issue" : "Share Your Review"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary small mb-2">
            {type === "Report" ? "Tell the hotel team what went wrong." : "Tell us about your food ordering experience."}
          </p>
          <Form.Control
            as="textarea"
            rows={5}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder={type === "Report" ? "Example: Food is late / item missing..." : "Write your review..."}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => guest.setShowReportModal(false)}>Cancel</Button>
          <Button variant="danger" type="submit" disabled={guest.isLoading}>{guest.isLoading ? "Submitting..." : "Submit"}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default GuestFeedbackModal;
