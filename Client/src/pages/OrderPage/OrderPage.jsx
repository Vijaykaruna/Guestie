import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import ModalTable from "../../components/ModalTable.jsx";
import { useOrderPage } from "../../hooks/useOrderPage.js";
import { useModalTable } from "../../hooks/useModal.js";
import { useEffect, useState } from "react";

const OrderPage = ({ orderControl, refreshTick }) => {
  const { modal, openModal, onClose } = useModalTable();
  const useOrder = useOrderPage({ orderControl, openModal });
  const [selected, setSelected] = useState([]);

  useEffect(() => { useOrder.getAllOrders(); }, [refreshTick]);

  const pending = useOrder.ordersList.filter((o) => o.status === "Pending").length;
  const delivered = useOrder.ordersList.filter((o) => o.status === "Delivered").length;

  const handleReject = (orderId) => {
    const reason = window.prompt("Why are you rejecting this order? Please enter the reason for guest response:");
    if (!reason || !reason.trim()) return;
    useOrder.updateOrderStatus(orderId, "Rejected", reason.trim());
  };

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleDeleteSelected = async () => {
    if (!selected.length) return;
    if (!window.confirm(`Delete ${selected.length} selected order(s)?`)) return;
    for (const id of selected) {
      await orderControl.deleteOrder?.(id);
    }
    setSelected([]);
    useOrder.getAllOrders();
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card">
        <div>
          <span className="admin-kicker">Kitchen Operations</span>
          <h1>Order List</h1>
          <p>Track guest food orders in real time, view ordered foods, and update delivery or rejection status.</p>
        </div>
      </div>

      <div className="admin-info-grid">
        <div className="admin-info-card"><span>Total Orders</span><strong>{useOrder.ordersList.length}</strong><p>All orders received from guests.</p></div>
        <div className="admin-info-card"><span>Pending</span><strong>{pending}</strong><p>Orders waiting for kitchen action.</p></div>
        <div className="admin-info-card"><span>Delivered</span><strong>{delivered}</strong><p>Completed and served orders.</p></div>
      </div>

      {modal && <ModalTable title={modal.title} content={modal.content} type={modal.type} onClose={onClose} />}

      <div className="admin-content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div className="guest-section-title"><div><span>Orders</span><h2>Guest Order Details</h2></div></div>
          {selected.length > 0 && (
            <button className="select-delete-btn" onClick={handleDeleteSelected}>
              🗑 Delete Selected ({selected.length})
            </button>
          )}
        </div>
        <p className="text-secondary m-0 mb-2">Approve delivered orders or reject unavailable items with reason.</p>
        <div className="table-responsive admin-table-wrap">
          <table className="table table-hover align-middle admin-table">
            <thead>
              <tr className="text-center">
                <th><input type="checkbox" onChange={(e) => {
                  if (e.target.checked) setSelected(useOrder.ordersList.map(o => o._id));
                  else setSelected([]);
                }} checked={selected.length === useOrder.ordersList.length && useOrder.ordersList.length > 0} /></th>
                <th>Name</th><th>Room No</th><th>Date</th><th>Mobile</th><th>Foods</th><th>Status</th><th>Guest Id</th>
              </tr>
            </thead>
            {useOrder.ordersList.length === 0 ? (
              <tbody><tr><td colSpan={8} className="text-center text-secondary py-4">No order</td></tr></tbody>
            ) : (
              <tbody>
                {useOrder.ordersList.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td><input type="checkbox" checked={selected.includes(order._id)} onChange={() => toggleSelect(order._id)} /></td>
                    <td className="fw-bold">{order.name}</td>
                    <td>{order.roomNumber}</td>
                    <td>{order.date}</td>
                    <td>{order.mobile}</td>
                    <td><button className="btn btn-sm btn-primary rounded-2" onClick={() => useOrder.showOrderById(order._id)}>Show</button></td>
                    <td>
                      {order.status === "Delivered" ? <span className="admin-status">Delivered</span>
                        : order.status === "Rejected" ? (
                          <div className="d-grid gap-1 justify-items-center">
                            <span className="admin-status rejected">Rejected</span>
                            {order.rejectionReason && <small className="text-danger fw-semibold">{order.rejectionReason}</small>}
                          </div>
                        ) : (
                          <div className="d-flex flex-column align-items-center gap-2">
                            <span className="admin-status pending">Pending</span>
                            <div className="d-flex gap-2">
                              <button onClick={() => useOrder.updateOrderStatus(order._id, "Delivered")} className="btn btn-sm btn-success rounded-2"><IoCheckmarkSharp /></button>
                              <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-danger rounded-2"><FaXmark /></button>
                            </div>
                          </div>
                        )}
                    </td>
                    <td>{"..." + order.guestId.slice(-5)}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <p className="text-center text-secondary my-2"><IoCheckmarkSharp className="text-success" /> Delivered &nbsp;|&nbsp; <FaXmark className="text-danger" /> Rejected with reason</p>
      </div>
    </div>
  );
};
export default OrderPage;
