import { useEffect, useState } from "react";
import { useInvoicePage } from "../../hooks/useInvoicePage.js";
import { useModalTable } from "../../hooks/useModal.js";
import ModalTable from "../../components/ModalTable.jsx";
import ModalAlertment from "../../components/ModalAlertment.jsx";

const InvoicePage = ({ guestControl, refreshTick }) => {
  const { modal, openModal, onClose } = useModalTable();
  const useInvoice = useInvoicePage({ guestControl, openModal });
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    useInvoice.loadGuests?.();
  }, [refreshTick]);

  const totalAmount = useInvoice.guestDetailsList.reduce(
    (sum, guest) => sum + (guest.totalAmount || 0),
    0,
  );
  const pendingPayments = useInvoice.guestDetailsList.filter(
    (guest) => guest.payment === "Pending",
  ).length;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (!selected.length) return;
    if (!window.confirm(`Delete ${selected.length} selected invoice(s)?`))
      return;
    for (const id of selected) {
      await guestControl.deleteGuest(id);
    }
    setSelected([]);
    useInvoice.loadGuests();
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card">
        <div>
          <span className="admin-kicker">Billing</span>
          <h1>Invoice</h1>
          <p>
            Review guest order bills, open food details, and mark pending
            payments as paid.
          </p>
        </div>
      </div>
      <div className="admin-info-grid">
        <div className="admin-info-card">
          <span>Invoices</span>
          <strong>{useInvoice.guestDetailsList.length}</strong>
          <p>Guest billing records.</p>
        </div>
        <div className="admin-info-card">
          <span>Total Sales</span>
          <strong>₹{totalAmount.toFixed(0)}</strong>
          <p>Amount generated from food orders.</p>
        </div>
        <div className="admin-info-card">
          <span>Pending Payments</span>
          <strong>{pendingPayments}</strong>
          <p>Need payment confirmation.</p>
        </div>
      </div>
      <div className="admin-content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div className="guest-section-title">
            <div>
              <span>Payments</span>
              <h2>Invoice Details</h2>
            </div>
          </div>
          {selected.length > 0 && (
            <button
              className="select-delete-btn"
              onClick={handleDeleteSelected}
            >
              🗑 Delete Selected ({selected.length})
            </button>
          )}
        </div>
        <p className="text-secondary m-0 mb-2">
          Click pending to confirm received payment.
        </p>
        <div className="table-responsive admin-table-wrap">
          <table className="table table-hover align-middle admin-table">
            <thead>
              <tr className="text-center">
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelected(
                          useInvoice.guestDetailsList.map((g) => g._id),
                        );
                      else setSelected([]);
                    }}
                    checked={
                      selected.length === useInvoice.guestDetailsList.length &&
                      useInvoice.guestDetailsList.length > 0
                    }
                  />
                </th>
                <th>Guest Name</th>
                <th>Room No</th>
                <th>Mobile</th>
                <th>Total Orders</th>
                <th>View Orders</th>
                <th>Total Amount</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {useInvoice.guestDetailsList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-secondary py-4">
                    No Guest Details
                  </td>
                </tr>
              ) : (
                useInvoice.guestDetailsList.map((guest) => (
                  <tr key={guest._id} className="text-center">
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(guest._id)}
                        onChange={() => toggleSelect(guest._id)}
                      />
                    </td>
                    <td className="fw-bold">{guest.name}</td>
                    <td>{guest.roomNumber}</td>
                    <td>{guest.mobile}</td>
                    <td>{guest.orders.length || 0}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary rounded-2"
                        onClick={() =>
                          useInvoice.showOrderedListById(guest._id)
                        }
                      >
                        View
                      </button>
                    </td>
                    <td>₹{guest.totalAmount.toFixed(2)}</td>
                    <td>
                      {guest.payment === "Pending" ? (
                        <button
                          className="btn btn-sm btn-danger rounded-2"
                          onClick={() =>
                            useInvoice.showAlertPaymentStatus(guest._id)
                          }
                        >
                          Pending
                        </button>
                      ) : (
                        <span className="admin-status">Paid</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <ModalTable
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onClose={onClose}
        />
      )}
      {useInvoice.selectedGuest && (
        <ModalAlertment
          user={useInvoice.selectedGuest}
          type="payment"
          onClose={useInvoice.closePaymentModal}
          onChange={useInvoice.markAsPaid}
        />
      )}
    </div>
  );
};

export default InvoicePage;
