import Offcanvas from "react-bootstrap/Offcanvas";
import { TbLogout } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { useEffect } from "react";

const MainOffCanvas = ({ useMain, hotelControl, authControl }) => {
  const { initial, showOffcanvas, setShowOffcanvas, setShowModalUser, logout } =
    useMain;

  const { hotelDetails, getHotelDetails } = hotelControl;

  useEffect(() => {
    getHotelDetails();
  }, []);

  const fields = hotelDetails
    ? [
        { label: "Name",       value: hotelDetails.user    },
        { label: "Email",      value: hotelDetails.email   },
        { label: "Mobile",     value: hotelDetails.mobile  },
        { label: "Hotel",      value: hotelDetails.hotel   },
        { label: "Address",    value: hotelDetails.address },
      ]
    : [];

  return (
    <Offcanvas
      show={showOffcanvas}
      onHide={() => setShowOffcanvas(false)}
      placement="end"
      style={{ width: 320, background: "linear-gradient(160deg,#fff7f0 0%,#fff 60%,#f6f8ff 100%)", borderLeft: "1px solid rgba(220,38,38,.1)" }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <Offcanvas.Header
        closeButton
        style={{ borderBottom: "1px solid rgba(220,38,38,.1)", padding: "16px 20px" }}
      >
        <span style={{ fontWeight: 900, fontSize: "1rem", letterSpacing: ".04em", color: "#111827" }}>
          My Profile
        </span>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ padding: "24px 20px 100px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── Avatar + edit ──────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 80, height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#dc2626,#f97316)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "2rem",
              textTransform: "uppercase",
              boxShadow: "0 12px 32px rgba(220,38,38,.28)",
              userSelect: "none",
            }}
          >
            {initial}
          </div>

          {hotelDetails && (
            <p style={{ margin: 0, fontWeight: 900, fontSize: "1.05rem", color: "#111827" }}>
              {hotelDetails.user}
            </p>
          )}

          <button
            onClick={() => { setShowOffcanvas(false); setShowModalUser(true); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 18px", borderRadius: 999,
              background: "transparent",
              border: "1.5px solid rgba(220,38,38,.35)",
              color: "#dc2626", fontWeight: 700, fontSize: ".82rem",
              cursor: "pointer", transition: "all .18s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#dc2626"; }}
          >
            <CiEdit style={{ fontSize: "1.1rem" }} />
            Edit Profile
          </button>
        </div>

        {/* ── Divider ────────────────────────────────────── */}
        <div style={{ height: 1, background: "rgba(220,38,38,.1)", borderRadius: 2 }} />

        {/* ── Detail rows or empty state ─────────────────── */}
        {hotelDetails ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {fields.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,.85)",
                  border: "1px solid rgba(220,38,38,.08)",
                  borderRadius: 16,
                  padding: "12px 16px",
                  boxShadow: "0 4px 14px rgba(17,24,39,.05)",
                }}
              >
                <p style={{ margin: 0, fontSize: ".72rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", color: "#dc2626" }}>
                  {label}
                </p>
                <p style={{ margin: 0, fontWeight: 600, color: "#111827", fontSize: ".92rem", marginTop: 2 }}>
                  {value || <span style={{ color: "#9ca3af" }}>—</span>}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center", padding: "28px 16px",
              background: "rgba(255,255,255,.85)",
              border: "1px dashed rgba(220,38,38,.25)",
              borderRadius: 22,
            }}
          >
            <div style={{ fontSize: "2.4rem", marginBottom: 8 }}>🏨</div>
            <p style={{ fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>No details yet</p>
            <p style={{ color: "#6b7280", fontSize: ".85rem", margin: 0 }}>
              Click <strong>Edit Profile</strong> above to fill in your hotel information.
            </p>
          </div>
        )}
      </Offcanvas.Body>

      {/* ── Logout footer ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "16px 20px",
          background: "rgba(255,255,255,.92)",
          borderTop: "1px solid rgba(220,38,38,.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => logout(authControl)}
          style={{
            width: "100%", padding: "11px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            borderRadius: 14,
            background: "linear-gradient(135deg,#dc2626,#f97316)",
            border: "none", color: "#fff",
            fontWeight: 800, fontSize: ".9rem",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(220,38,38,.28)",
            transition: "opacity .18s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <TbLogout style={{ fontSize: "1.2rem" }} />
          Log out
        </button>
      </div>
    </Offcanvas>
  );
};

export default MainOffCanvas;
