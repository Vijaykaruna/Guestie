import { useEffect, useState } from "react";
import ModalAlertment from "../../components/ModalAlertment.jsx";
import ModalTable from "../../components/ModalTable.jsx";
import { useHotelPage } from "../../hooks/useHotelPage.js";
import { useModalTable } from "../../hooks/useModal.js";
import { FiSearch, FiX } from "react-icons/fi";

const HotelPage = ({ hotelControl, useAuth, refreshTick, onEditProfile }) => {
  const { modal, openModal, onClose } = useModalTable();
  const useHotel = useHotelPage({ hotelControl, openModal });

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (useAuth.user.isAdmin) hotelControl.getAllHotelDetails();
    else hotelControl.getHotelDetails();
  }, [refreshTick]);

  const hotels = hotelControl.allHotelDetails || [];
  const activeHotels = hotels.filter((hotel) => hotel.isSubscripe).length;
  const hotelDetails = hotelControl.hotelDetails;

  const filteredHotels = searchQuery.trim()
    ? hotels.filter((h) => {
        const q = searchQuery.toLowerCase();
        return (
          h.user?.toLowerCase().includes(q) ||
          h.email?.toLowerCase().includes(q) ||
          h.mobile?.toLowerCase().includes(q) ||
          h.hotel?.toLowerCase().includes(q)
        );
      })
    : hotels;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-hero-card">
        <div>
          <span className="admin-kicker">Subscription</span>
          <h1>Hotel Plans</h1>
          <p>Manage hotel subscription access, plan history, active rooms, and guest ordering availability.</p>
        </div>
      </div>

      {useAuth.user.isAdmin ? (
        <>
          <div className="admin-info-grid">
            <div className="admin-info-card">
              <span>Total Hotels</span>
              <strong>{hotels.length}</strong>
              <p>Registered hotel accounts.</p>
            </div>
            <div className="admin-info-card">
              <span>Active Plans</span>
              <strong>{activeHotels}</strong>
              <p>Hotels currently subscribed.</p>
            </div>
            <div className="admin-info-card">
              <span>Inactive</span>
              <strong>{hotels.length - activeHotels}</strong>
              <p>Need subscription activation.</p>
            </div>
          </div>

          <div className="admin-content-card">
            <div className="guest-section-title" style={{ marginBottom: 18 }}>
              <div>
                <span>Access</span>
                <h2>Subscription Details</h2>
              </div>
              <p className="text-secondary m-0">Click Active/Inactive to update subscription status.</p>
            </div>

            {/* ── Search bar ─────────────────────────────── */}
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 18,
                maxWidth: 480,
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <FiSearch
                  style={{
                    position: "absolute", left: 12, top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af", fontSize: "1rem", pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name, email, mobile or hotel…"
                  style={{
                    width: "100%",
                    padding: "9px 36px 9px 36px",
                    borderRadius: 12,
                    border: "1.5px solid rgba(220,38,38,.2)",
                    background: "rgba(255,255,255,.9)",
                    fontSize: ".88rem",
                    fontWeight: 600,
                    color: "#111827",
                    outline: "none",
                    transition: "border-color .18s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(220,38,38,.2)")}
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClear}
                    style={{
                      position: "absolute", right: 10, top: "50%",
                      transform: "translateY(-50%)",
                      background: "none", border: "none",
                      color: "#9ca3af", cursor: "pointer", padding: 2,
                      display: "flex", alignItems: "center",
                    }}
                  >
                    <FiX style={{ fontSize: "1rem" }} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                style={{
                  padding: "9px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg,#dc2626,#f97316)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: ".88rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(220,38,38,.25)",
                  transition: "opacity .18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = ".88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Search
              </button>
            </form>

            {/* ── Result count badge ─────────────────────── */}
            {searchQuery && (
              <p style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 10, fontWeight: 700 }}>
                {filteredHotels.length === 0
                  ? `No results for "${searchQuery}"`
                  : `${filteredHotels.length} result${filteredHotels.length !== 1 ? "s" : ""} for "${searchQuery}"`
                }
              </p>
            )}

            <div className="table-responsive admin-table-wrap">
              <table className="table table-hover align-middle admin-table">
                <thead>
                  <tr className="text-center">
                    <th>User</th><th>Email</th><th>Mobile</th><th>Rooms</th>
                    <th>Subscription</th><th>Hotel</th><th>Address</th>
                    <th>Active plan</th><th>Actived Date</th><th>Deactive Date</th><th>Plans history</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotels.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="text-center text-muted py-4">
                        {searchQuery ? `No hotels matched "${searchQuery}"` : "No hotels registered yet"}
                      </td>
                    </tr>
                  ) : (
                    filteredHotels.map((hotel) => {
                      const lastPlan = hotel.subcripedHistory?.length > 0
                        ? hotel.subcripedHistory[hotel.subcripedHistory.length - 1]
                        : null;
                      return (
                        <tr key={hotel._id} className="text-center">
                          <td className="fw-bold">{hotel.user}</td>
                          <td>{hotel.email}</td>
                          <td>{hotel.mobile}</td>
                          <td>{hotel.rooms}</td>
                          <td>
                            {hotel.isSubscripe
                              ? <button className="btn btn-success btn-sm rounded-2" onClick={() => useHotel.handleShowSubcriptionModal(hotel._id, false)}>Active</button>
                              : <button className="btn btn-danger btn-sm rounded-2" onClick={() => useHotel.handleShowSubcriptionModal(hotel._id, true)}>Inactive</button>
                            }
                          </td>
                          <td>{hotel.hotel}</td>
                          <td>{hotel.address}</td>
                          <td>{lastPlan?.planDetails || "-"}</td>
                          <td>{lastPlan?.activeDate || "-"}</td>
                          <td>{lastPlan?.deActiveDate || "-"}</td>
                          <td>
                            <button className="btn btn-sm btn-primary rounded-2" onClick={() => useHotel.HandleShowPlanDetails(hotel.subcripedHistory)}>View</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="admin-content-card">
          <div className="guest-section-title">
            <div>
              <span>My Plan</span>
              <h2>Subscription Status</h2>
            </div>
          </div>

          {hotelDetails === null ? (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: "3rem" }}>📋</div>
              <h5 className="fw-bold text-danger mb-2">Profile Incomplete</h5>
              <p className="text-secondary mb-4">
                Please complete your hotel profile before viewing subscription details.
              </p>
              <button
                className="btn btn-danger rounded-pill px-4 py-2 fw-semibold shadow-sm"
                onClick={onEditProfile}
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <>
              {hotelDetails.isSubscripe === false
                ? <div className="alert alert-warning fw-bold">Your account subscription has expired. Please renew to continue enjoying our services.</div>
                : <div className="alert alert-success fw-bold">Your account has been successfully subscribed. You can now enjoy all services and features.</div>
              }
              <div className="table-responsive admin-table-wrap">
                <table className="table table-hover align-middle admin-table">
                  <thead>
                    <tr className="text-center">
                      <th>Plan</th><th>Active Date</th><th>Deactive Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelDetails.subcripedHistory?.length > 0
                      ? hotelDetails.subcripedHistory.map((plan, i) => (
                          <tr key={i} className="text-center">
                            <td>{plan.planDetails}</td>
                            <td>{plan.activeDate}</td>
                            <td>{plan.deActiveDate}</td>
                          </tr>
                        ))
                      : <tr><td colSpan="3" className="text-center text-muted">No subscription history found</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {useHotel.selectedUser && (
        <ModalAlertment
          user={useHotel.selectedUser}
          type={useHotel.updateSubscripe ? "subscribe" : "de-subscribe"}
          onClose={useHotel.closeAlertment}
          onChange={useHotel.handleUpdateHotelSubcription}
        />
      )}
      {modal && <ModalTable title={modal.title} content={modal.content} type={modal.type} onClose={onClose} />}
    </div>
  );
};

export default HotelPage;
