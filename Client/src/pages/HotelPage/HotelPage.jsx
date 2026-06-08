import { useEffect } from "react";
import ModalAlertment from "../../components/ModalAlertment.jsx";
import ModalTable from "../../components/ModalTable.jsx";
import { useHotelPage } from "../../hooks/useHotelPage.js";
import { useModalTable } from "../../hooks/useModal.js";

const HotelPage = ({ hotelControl, useAuth }) => {
  const { modal, openModal, onClose } = useModalTable();
  const useHotel = useHotelPage({ hotelControl, openModal });

  useEffect(() => {
    if (useAuth.user.isAdmin) hotelControl.getAllHotelDetails();
    else hotelControl.getHotelDetails();
  }, []);

  const hotels = hotelControl.allHotelDetails || [];
  const activeHotels = hotels.filter((hotel) => hotel.isSubscripe).length;

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card"><div><span className="admin-kicker">Subscription</span><h1>Hotel Plans</h1><p>Manage hotel subscription access, plan history, active rooms, and guest ordering availability.</p></div></div>

      {useAuth.user.isAdmin ? (
        <>
          <div className="admin-info-grid"><div className="admin-info-card"><span>Total Hotels</span><strong>{hotels.length}</strong><p>Registered hotel accounts.</p></div><div className="admin-info-card"><span>Active Plans</span><strong>{activeHotels}</strong><p>Hotels currently subscribed.</p></div><div className="admin-info-card"><span>Inactive</span><strong>{hotels.length - activeHotels}</strong><p>Need subscription activation.</p></div></div>
          <div className="admin-content-card">
            <div className="guest-section-title"><div><span>Access</span><h2>Subscription Details</h2></div><p className="text-secondary m-0">Click Active/Inactive to update subscription status.</p></div>
            <div className="table-responsive admin-table-wrap"><table className="table table-hover align-middle admin-table"><thead><tr className="text-center"><th>User</th><th>Email</th><th>Mobile</th><th>Rooms</th><th>Subscription</th><th>Hotel</th><th>Address</th><th>Active plan</th><th>Actived Date</th><th>Deactive Date</th><th>Plans history</th></tr></thead><tbody>
              {hotels.map((hotel) => { const lastPlan = hotel.subcripedHistory.length > 0 ? hotel.subcripedHistory[hotel.subcripedHistory.length - 1] : null; return (
                <tr key={hotel._id} className="text-center"><td className="fw-bold">{hotel.user}</td><td>{hotel.email}</td><td>{hotel.mobile}</td><td>{hotel.rooms}</td><td>{hotel.isSubscripe ? <button className="btn btn-success btn-sm rounded-2" onClick={() => useHotel.handleShowSubcriptionModal(hotel._id, false)}>Active</button> : <button className="btn btn-danger btn-sm rounded-2" onClick={() => useHotel.handleShowSubcriptionModal(hotel._id, true)}>Inactive</button>}</td><td>{hotel.hotel}</td><td>{hotel.address}</td><td>{lastPlan?.planDetails || "-"}</td><td>{lastPlan?.activeDate || "-"}</td><td>{lastPlan?.deActiveDate || "-"}</td><td><button className="btn btn-sm btn-primary rounded-2" onClick={() => useHotel.HandleShowPlanDetails(hotel.subcripedHistory)}>View</button></td></tr>
              ); })}
            </tbody></table></div>
          </div>
        </>
      ) : (
        <div className="admin-content-card">
          <div className="guest-section-title"><div><span>My Plan</span><h2>Subscription Status</h2></div></div>
          {hotelControl.hotelDetails.isSubscripe === false ? <div className="alert alert-warning fw-bold">Your account subscription has expired. Please renew to continue enjoying our services.</div> : <div className="alert alert-success fw-bold">Your account has been successfully subscribed. You can now enjoy all services and features.</div>}
          <div className="table-responsive admin-table-wrap"><table className="table table-hover align-middle admin-table"><thead><tr className="text-center"><th>Plan</th><th>Active Date</th><th>Deactive Date</th></tr></thead><tbody>{hotelControl.hotelDetails.subcripedHistory?.length > 0 ? hotelControl.hotelDetails.subcripedHistory.map((plan, i) => <tr key={i} className="text-center"><td>{plan.planDetails}</td><td>{plan.activeDate}</td><td>{plan.deActiveDate}</td></tr>) : <tr><td colSpan="3" className="text-center text-muted">No subscription history found</td></tr>}</tbody></table></div>
        </div>
      )}
      {useHotel.selectedUser && <ModalAlertment user={useHotel.selectedUser} type={useHotel.updateSubscripe ? "subscribe" : "de-subscribe"} onClose={useHotel.closeAlertment} onChange={useHotel.handleUpdateHotelSubcription} />}
      {modal && <ModalTable title={modal.title} content={modal.content} type={modal.type} onClose={onClose} />}
    </div>
  );
};

export default HotelPage;
