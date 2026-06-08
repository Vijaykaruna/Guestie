import { Modal as RoomModal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const ModalRoom = ({ useDash, hotelControl }) => {
  const [rooms, setRooms] = useState(5);

  return (
    <RoomModal
      show={useDash.showModalRoom}
      onHide={() => useDash.setShowModalRoom(false)}
      centered
    >
      <RoomModal.Header closeButton>
        <RoomModal.Title>Total Rooms</RoomModal.Title>
      </RoomModal.Header>
      <RoomModal.Body className="text-center">
        <Form.Group className="mb-2">
          <Form.Label>No of Rooms</Form.Label>
          <Form.Control
            type="number"
            name="rooms"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </Form.Group>
      </RoomModal.Body>
      <RoomModal.Footer>
        <Button
          variant="primary"
          onClick={() => useDash.handleSaveRooms(rooms)}
          disabled={!hotelControl.hotelDetails?.isSubscripe}
        >
          {hotelControl.hotelDetails?.isSubscripe
            ? "Submit"
            : "Subscription Required"}
        </Button>
      </RoomModal.Footer>
    </RoomModal>
  );
};
export default ModalRoom;
