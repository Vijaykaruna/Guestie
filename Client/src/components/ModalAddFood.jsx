import { Modal as AddFoodModal } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useModalAddFood } from "../hooks/useModal.js";
import Dosa from "../assets/dosa.png";

const MAX_IMAGE_SIZE = 750 * 1024;

const ModalAddFood = ({ useFood }) => {
  const {
    showAddFoodModal,
    setShowAddFoodModal,
    handleAddFood,
    handleUpdateFood,
    editingFood,
  } = useFood;

  const { addFoodDetails, setAddFoodDetails } = useModalAddFood(editingFood);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Please choose an image below 750KB for smooth deployment and database storage.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAddFoodDetails((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submitFood = () => {
    const payload = {
      ...addFoodDetails,
      title: addFoodDetails.title.trim(),
      category: addFoodDetails.category,
      price: Number(addFoodDetails.price),
      description:
        addFoodDetails.description?.trim() ||
        "Freshly prepared and delivered to your room.",
    };

    editingFood ? handleUpdateFood(editingFood._id, payload) : handleAddFood(payload);
  };

  return (
    <AddFoodModal
      show={showAddFoodModal}
      onHide={() => setShowAddFoodModal(false)}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      dialogClassName="food-modal"
    >
      <AddFoodModal.Header closeButton className="admin-modal-header">
        <AddFoodModal.Title>{editingFood ? "Update Food" : "Add New Food"}</AddFoodModal.Title>
      </AddFoodModal.Header>
      <AddFoodModal.Body className="admin-modal-body">
        <div className="row g-3 align-items-stretch">
          <div className="col-lg-5">
            <div className="food-image-picker h-100">
              <img
                src={addFoodDetails.image || Dosa}
                alt="Food preview"
                className="food-preview-img"
              />
              <Form.Label className="btn guest-add-btn w-100 mt-3 mb-0">
                Choose Food Image
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
              </Form.Label>
              {addFoodDetails.image && (
                <Button
                  variant="outline-danger"
                  className="w-100 mt-2 rounded-pill"
                  onClick={() => setAddFoodDetails((prev) => ({ ...prev, image: "" }))}
                >
                  Remove Image
                </Button>
              )}
              <small className="text-muted d-block mt-2 text-center">
                Recommended: square image below 750KB.
              </small>
            </div>
          </div>

          <div className="col-lg-7 d-flex flex-column gap-3">
            <FloatingLabel controlId="floatingFoodName" label="Food name">
              <Form.Control
                type="text"
                placeholder="Food name"
                value={addFoodDetails.title}
                onChange={(e) =>
                  setAddFoodDetails((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </FloatingLabel>

            <Form.Select
              value={addFoodDetails.category}
              onChange={(e) =>
                setAddFoodDetails((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">Select category</option>
              <option value="BreakFast">BreakFast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Refreshment">Refreshment</option>
            </Form.Select>

            <FloatingLabel controlId="floatingFoodPrice" label="Food price">
              <Form.Control
                type="number"
                min="1"
                placeholder="Price"
                value={addFoodDetails.price}
                onChange={(e) =>
                  setAddFoodDetails((prev) => ({ ...prev, price: Number(e.target.value) }))
                }
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingFoodDescription" label="Short description">
              <Form.Control
                as="textarea"
                style={{ height: 110 }}
                placeholder="Short description"
                value={addFoodDetails.description}
                onChange={(e) =>
                  setAddFoodDetails((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </FloatingLabel>

            <Form.Check
              type="switch"
              id="food-availability"
              label="Available for guest ordering"
              checked={addFoodDetails.isAvailable}
              onChange={(e) =>
                setAddFoodDetails((prev) => ({ ...prev, isAvailable: e.target.checked }))
              }
            />
          </div>
        </div>
      </AddFoodModal.Body>
      <AddFoodModal.Footer className="admin-modal-footer">
        <Button variant="light" className="rounded-pill px-4" onClick={() => setShowAddFoodModal(false)}>
          Cancel
        </Button>
        <Button className="guest-add-btn px-4" onClick={submitFood}>
          {editingFood ? "Update Food" : "Add Food"}
        </Button>
      </AddFoodModal.Footer>
    </AddFoodModal>
  );
};

export default ModalAddFood;
