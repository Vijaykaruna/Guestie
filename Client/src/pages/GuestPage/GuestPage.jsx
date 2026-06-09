import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGuestPage } from "../../hooks/useGuestPage";
import ModalAddGuest from "../../components/ModalAddGuest.jsx";

const GuestPage = ({ guestControl, triggerToast, refreshTick }) => {
  const useGuest = useGuestPage({ guestControl });
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => { useGuest.loadGuests?.(); }, [refreshTick]);

  const isActiveStay = (guest) => guest.isStay === "Yes" || guest.stayStatus === true;
  const activeGuests = useGuest.guestDetailsList.filter(isActiveStay).length;
  const completedGuests = useGuest.guestDetailsList.length - activeGuests;

  const toggleSelect = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleDeleteSelected = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} guest(s) and ALL their data (orders, invoices)?`)) return;
    for (const id of selectedIds) {
      await guestControl.deleteGuestAllData?.(id, triggerToast);
    }
    setSelectedIds([]);
    useGuest.loadGuests?.();
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card">
        <div>
          <span className="admin-kicker">Guest Management</span>
          <h1>Guest Bookings</h1>
          <p>Add guest room details, keep mobile verification ready, and manage stay status for QR based food ordering.</p>
        </div>
        <Button className="admin-primary-action" onClick={() => useGuest.setShowAddGuestModal(true)}>
          <FaPlusCircle className="me-2" /> Add Guest
        </Button>
      </div>

      <div className="admin-info-grid">
        <div className="admin-info-card"><span>Total Guests</span><strong>{useGuest.guestDetailsList.length}</strong><p>All guest bookings added in this hotel.</p></div>
        <div className="admin-info-card"><span>Active Stays</span><strong>{activeGuests}</strong><p>Guests currently allowed to order food.</p></div>
        <div className="admin-info-card"><span>Completed</span><strong>{completedGuests}</strong><p>Guests whose stay has been closed.</p></div>
      </div>

      <div className="admin-content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div className="guest-section-title">
            <div><span>Records</span><h2>Guest Details</h2></div>
          </div>
          {selectedIds.length > 0 && (
            <button className="select-delete-btn" onClick={handleDeleteSelected}>
              🗑 Delete Selected ({selectedIds.length}) — removes all data
            </button>
          )}
        </div>
        <p className="text-secondary m-0 mb-2">Use stay status to control guest ordering access. Deleting a guest removes all their orders & invoice data.</p>

        {useGuest.showAddGuestModal && <ModalAddGuest useGuest={useGuest} triggerToast={triggerToast} />}

        <div className="table-responsive admin-table-wrap">
          <table className="table table-hover align-middle admin-table guest-admin-table">
            <thead>
              <tr className="text-center">
                <th>
                  <input type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(useGuest.guestDetailsList.map(g => g._id));
                      else setSelectedIds([]);
                    }}
                    checked={selectedIds.length === useGuest.guestDetailsList.length && useGuest.guestDetailsList.length > 0}
                  />
                </th>
                <th>Name</th><th>Room</th><th>Guests</th><th>Mobile</th><th>Check-in</th><th>Check-out</th><th>Stay</th><th>Details</th>
              </tr>
            </thead>
            <tbody>
              {useGuest.guestDetailsList.length === 0 ? (
                <tr><td colSpan={9} className="text-center text-secondary py-4">No Guest Details</td></tr>
              ) : (
                useGuest.guestDetailsList.map((guest) => (
                  <tr key={guest._id} className="text-center">
                    <td><input type="checkbox" checked={selectedIds.includes(guest._id)} onChange={() => toggleSelect(guest._id)} /></td>
                    <td className="fw-bold">{guest.name}</td>
                    <td>{guest.roomNumber}</td>
                    <td>{guest.guests ?? guest.count ?? "-"}</td>
                    <td>{guest.mobile || "-"}</td>
                    <td>{guest.checkIn || guest.fromDate || "-"}</td>
                    <td>{guest.checkOut || guest.toDate || "-"}</td>
                    <td>
                      {isActiveStay(guest) ? (
                        <Button variant="success" size="sm" className="rounded-2 px-3" onClick={() => useGuest.handleUpdateStay(guest._id)}>Active</Button>
                      ) : <span className="admin-status off">Closed</span>}
                    </td>
                    <td><Button size="sm" variant="outline-danger" className="rounded-2" onClick={() => setSelectedGuest(guest)}>Details</Button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={!!selectedGuest} onHide={() => setSelectedGuest(null)} centered className="food-modal">
        <Modal.Header closeButton className="admin-modal-header"><Modal.Title>Guest Full Details</Modal.Title></Modal.Header>
        <Modal.Body className="admin-modal-body">
          {selectedGuest && (
            <div className="guest-detail-card">
              <p><b>Name:</b> {selectedGuest.name}</p>
              <p><b>Mobile:</b> {selectedGuest.mobile}</p>
              <p><b>Email:</b> {selectedGuest.email || "-"}</p>
              <p><b>Room:</b> {selectedGuest.roomNumber}</p>
              <p><b>No. of Guests:</b> {selectedGuest.guests ?? selectedGuest.count ?? "-"}</p>
              <p><b>Check-in:</b> {selectedGuest.checkIn || selectedGuest.fromDate || "-"}</p>
              <p><b>Check-out:</b> {selectedGuest.checkOut || selectedGuest.toDate || "-"}</p>
              <p><b>Stay:</b> {isActiveStay(selectedGuest) ? "Active" : "Closed"}</p>
              <p><b>Payment:</b> {selectedGuest.payment || "Pending"}</p>
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-2"
                  onClick={async () => {
                    if (!window.confirm("Delete this guest and ALL their data?")) return;
                    await guestControl.deleteGuestAllData?.(selectedGuest._id, triggerToast);
                    setSelectedGuest(null);
                    useGuest.loadGuests?.();
                  }}
                >
                  🗑 Delete Guest & All Data
                </Button>
                <Button variant="secondary" size="sm" className="rounded-2" onClick={() => setSelectedGuest(null)}>Close</Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default GuestPage;
