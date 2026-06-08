import { Modal as AddGuestModal, Button, Form, FloatingLabel } from "react-bootstrap";
import { FaBed, FaCalendarCheck, FaMobileAlt, FaUserPlus } from "react-icons/fa";
import { useModalAddGuest } from "../hooks/useModal.js";

const ModalAddGuest = ({ useGuest, triggerToast }) => {
  const useModal = useModalAddGuest({ useGuest, triggerToast });

  return (
    <AddGuestModal show onHide={() => useGuest.setShowAddGuestModal(false)} centered size="lg" className="food-modal">
      <AddGuestModal.Header closeButton className="admin-modal-header">
        <AddGuestModal.Title><FaUserPlus className="me-2 text-danger" /> Add Guest Booking</AddGuestModal.Title>
      </AddGuestModal.Header>
      <AddGuestModal.Body className="admin-modal-body">
        <div className="admin-description-card mb-3">
          <div className="admin-description-icon"><FaBed /></div>
          <div>
            <h5>Guest ordering access</h5>
            <p>Add accurate room and mobile details. The same mobile number will be used for guest verification before placing food orders.</p>
          </div>
        </div>
        <Form className="row g-3">
          {useModal.formFields.map((form) =>
            form.name !== "roomNumber" ? (
              <div className="col-md-6" key={form.id}>
                <FloatingLabel label={form.label}>
                  <Form.Control name={form.name} type={form.type} placeholder={form.placeholder} value={form.value} onChange={form.onChange} required />
                </FloatingLabel>
              </div>
            ) : (
              <div className="col-md-6" key={form.id}>
                <FloatingLabel label={form.label}>
                  <Form.Select name={form.name} value={form.value} onChange={form.onChange} required>
                    <option value="">Select Room</option>
                    <option value={100}>100</option>
                    <option value={101}>101</option>
                    <option value={102}>102</option>
                    <option value={103}>103</option>
                    <option value={104}>104</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
            )
          )}
        </Form>
        <div className="admin-tip-row mt-3">
          <span><FaMobileAlt /> Mobile verification enabled</span>
          <span><FaCalendarCheck /> Stay status controls ordering</span>
        </div>
      </AddGuestModal.Body>
      <AddGuestModal.Footer className="admin-modal-footer">
        <Button variant="light" className="rounded-2" onClick={() => useGuest.setShowAddGuestModal(false)}>Cancel</Button>
        <Button variant="danger" className="rounded-2 px-4" onClick={useModal.newGuestDetails}>Add Booking</Button>
      </AddGuestModal.Footer>
    </AddGuestModal>
  );
};

export default ModalAddGuest;
