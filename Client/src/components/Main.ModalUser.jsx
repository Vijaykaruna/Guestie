import { Modal as UserModal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useModalUser } from "../hooks/useModal.js";

const MainModalUser = ({ useMain, hotelControl }) => {
  const { formFields, updateHotel } = useModalUser({ hotelControl });

  const { showModalUser, setShowModalUser } = useMain;

  return (
    <UserModal
      show={showModalUser}
      onHide={() => setShowModalUser(false)}
      backdrop="static"
      keyboard={false}
    >
      <UserModal.Header closeButton>
        <UserModal.Title>Edit Profile</UserModal.Title>
      </UserModal.Header>
      <UserModal.Body>
        <Form>
          {formFields.map((field) => (
            <Form.Group className="mb-2" key={field.id}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={field.onChange}
                required
              />
            </Form.Group>
          ))}
        </Form>
      </UserModal.Body>
      <UserModal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            updateHotel();
            setShowModalUser(false);
          }}
        >
          Save
        </Button>
      </UserModal.Footer>
    </UserModal>
  );
};

export default MainModalUser;
