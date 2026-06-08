import Modal from "react-bootstrap/Modal";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const QRModal = ({ useMain }) => {
  const Main = useMain;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(Main.link);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Copy failed!");
    }
  };

  return (
    <Modal show={Main.showQR} centered onHide={() => Main.setShowQR(false)}>
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <QRCodeCanvas
          className="p-2 border border-2 mb-3"
          value={Main.link}
          size={200}
        />

        <div className="mb-2">
          <a href={Main.link} target="_blank" rel="noreferrer">
            Open Link
          </a>
        </div>

        <Button
          variant={copied ? "success" : "primary"}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy Link"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default QRModal;