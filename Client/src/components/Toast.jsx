import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Toast as BootstrapToast } from "react-bootstrap";
const icons = {
  success: <BsCheckCircleFill className="fs-3 text-light" />,
  info: <AiFillInfoCircle className="fs-3 text-light" />,
  warning: <TiWarning className="fs-3 text-light" />,
  danger: <MdCancel className="fs-3 text-light" />,
};
function CustomToast({ type = "info", message, onClose = () => {} }) {
  return (
    <div className="d-flex justify-content-center align-items-start pt-5 position-fixed top-0 start-0 toast-overlay">
      <BootstrapToast
        bg={type}
        show={true}
        className="custom-toast animate-toast"
      >
        <BootstrapToast.Body className="d-flex align-items-center gap-3 text-light">
          {icons[type]} <span className="flex-grow-1">{message}</span>
          <IoClose className="fs-4 cursor-pointer" onClick={onClose} />
        </BootstrapToast.Body>
      </BootstrapToast>
    </div>
  );
}
export default CustomToast;
