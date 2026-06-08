import { Toast as GuestToast } from "react-bootstrap";

const GuestToastModal = ({ type, message, show = true }) => {
  return (
    <GuestToast bg={type} show={show} className="animate-toast" delay={3000} autohide>
      <GuestToast.Body className="d-flex align-items-center gap-3 text-light">
        <span className="flex-grow-1">{message}</span>
      </GuestToast.Body>
    </GuestToast>
  );
};
export default GuestToastModal;
