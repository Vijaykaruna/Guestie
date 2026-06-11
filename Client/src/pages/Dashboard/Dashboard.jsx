import { CiEdit } from "react-icons/ci";
import { useEffect } from "react";

import ModalRoom from "../../components/Modal.Room.jsx";
import ModalTable from "../../components/ModalTable.jsx";

import { useDashboard } from "../../hooks/useDashboard.js";
import { useModalTable } from "../../hooks/useModal.js";

const Dashboard = ({ hotelControl, orderControl, triggerToast, refreshTick }) => {
  const { modal, openModal, onClose } = useModalTable();

  const useDash = useDashboard({
    hotelControl,
    orderControl,
    triggerToast,
    openModal,
  });

  useEffect(() => {
    useDash.getAllOrders();
  }, [refreshTick]);

  return (
    <div className="admin-page-wrap">
      {/* Hero header — matches every other page */}
      <div className="admin-hero-card">
        <div>
          <span className="admin-kicker">Overview</span>
          <h1>Dashboard</h1>
          <p>Track your hotel's daily orders, room usage, and key metrics at a glance.</p>
        </div>
        <button
          className="btn btn-outline-danger btn-sm rounded-pill px-3 mt-2 mt-md-0"
          onClick={() => useDash.setShowModalRoom(true)}
        >
          <CiEdit className="fs-5 me-1" />
          Edit Rooms
        </button>
      </div>

      {/* Stats cards */}
      <div className="admin-info-grid">
        {useDash.dashTable.map(({ title, img, values, label, color }, index) => (
          <div key={index} className="admin-info-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>{title}</span>
              <img src={img} alt={`${title} icon`} style={{ width: 32, height: 32, objectFit: "contain" }} />
            </div>
            <strong style={{ fontSize: "2rem" }}>{values}</strong>
            <p className={`text-${color} mt-1 mb-0`} style={{ fontSize: "0.85rem" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="admin-content-card">
        <div className="guest-section-title">
          <div>
            <span>Live</span>
            <h2>Pending Orders</h2>
          </div>
          <p className="text-secondary m-0">All orders awaiting action.</p>
        </div>
        <div className="table-responsive admin-table-wrap">
          <table className="table table-hover align-middle admin-table">
            <thead>
              <tr className="text-center">
                <th scope="col">Room No</th>
                <th scope="col">Date &amp; Time</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Foods</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {useDash.pendingOrdersList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-secondary py-4">
                    No orders are pending
                  </td>
                </tr>
              ) : (
                useDash.pendingOrdersList.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td>{order.roomNumber}</td>
                    <td>{order.date}</td>
                    <td>{order.mobile}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary rounded-pill px-3"
                        onClick={() => useDash.showOrderById(order._id)}
                      >
                        Show
                      </button>
                    </td>
                    <td>
                      <span className="badge bg-danger px-3 py-2 rounded-pill">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalRoom useDash={useDash} hotelControl={hotelControl} />
      {modal && (
        <ModalTable
          title={modal.title}
          content={modal.content}
          type={modal.type}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
