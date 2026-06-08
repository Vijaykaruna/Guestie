import { CiEdit } from "react-icons/ci";

import { useEffect } from "react";

import ModalRoom from "../../components/Modal.Room.jsx";
import ModalTable from "../../components/ModalTable.jsx";

import { useDashboard } from "../../hooks/useDashboard.js";
import { useModalTable } from "../../hooks/useModal.js";

const Dashboard = ({ hotelControl, orderControl, triggerToast }) => {
  const { modal, openModal, onClose } = useModalTable();

  const useDash = useDashboard({
    hotelControl,
    orderControl,
    triggerToast,
    openModal,
  });

  useEffect(() => {
    useDash.getAllOrders();
  }, []);

  return (
    <div className="">
      <button
        className="btn btn-outline-light btn-sm border-0 float-end shadow-lg mx-2"
        onClick={() => useDash.setShowModalRoom(true)}
      >
        <CiEdit className="fs-3 text-danger" />
      </button>
      <div className="d-flex justify-content-around flex-column flex-lg-row gap-3 gap-lg-0 my-2">
        {useDash.dashTable.map(
          ({ title, img, values, label, color }, index) => (
            <div
              key={index}
              className="rounded-2 col-lg-3 py-2 bg-light shadow-lg"
            >
              <div className="d-flex justify-content-around align-items-center">
                <p className="fs-5 text-secondary">{title}</p>
                <img src={img} alt={`${title} icon`} className="img-fluid" />
              </div>
              <p className="fs-2 fw-bold text-center">{values}</p>
              <p className={`text-center pt-3 text-${color}`}>{label}</p>
            </div>
          )
        )}
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

      <div className="rounded-2 my-5 px-lg-5 px-2 py-2 col-12 bg-light shadow-lg">
        <p className="h5 my-4">Order Details:</p>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="border">
              <tr className="text-center">
                <th scope="col">Room No</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Mobile no</th>
                <th scope="col">Foods</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {useDash.pendingOrdersList.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={8} className="text-center text-secondary py-4">
                    "No orders are Pending"
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {useDash.pendingOrdersList.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td>{order.roomNumber}</td>
                    <td>{order.date}</td>
                    <td>{order.mobile}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => useDash.showOrderById(order._id)}
                      >
                        Show
                      </button>
                    </td>
                    <td>
                      <div className="p-1 bg-danger border text-light rounded-2">
                        {order.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
