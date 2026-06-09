import { useEffect } from "react";
import logo from "../assets/logo.png";
import { IoQrCodeSharp } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

const MainNavbar = ({ useMain, hotelControl }) => {
  const { initial, setShowOffcanvas, setShowQR, link, getQRCode, handleManualRefresh } = useMain;

  const { hotelDetails, getHotelDetails } = hotelControl;

  useEffect(() => {
    getHotelDetails();
  }, []);

  const subscripe = hotelDetails?.isSubscripe;

  return (
    <nav className="admin-topbar d-flex justify-content-between border-bottom">
      <img src={logo} alt="logo" className="admin-logo img-fluid" />
      <div className="d-flex me-lg-5 my-3 gap-lg-4 gap-3 align-items-center">
        {/* Refresh Button */}
        <button
          className="navbar-refresh-btn"
          onClick={handleManualRefresh}
          title="Refresh data"
        >
          <MdRefresh className="refresh-icon" />
          <span className="refresh-label">Refresh</span>
        </button>

        <div>
          {link === null ? (
            <button className="btn btn-sm rounded-2 btn-outline-danger fw-bold p-lg-2 p-1" onClick={getQRCode}>Get QR</button>
          ) : (
            <button className="btn btn-sm border py-2">
              <IoQrCodeSharp className="fs-3" onClick={() => setShowQR(true)} />
            </button>
          )}
        </div>
        <a
          href="#profile"
          onClick={() => setShowOffcanvas(true)}
          className="text-decoration-none text-dark"
        >
          {subscripe === true ? (
            <div
              className="bg-danger d-flex justify-content-center align-items-center text-light fw-bold fs-3 text-uppercase rounded-pill border-warning user-select-none position-relative top-25 start-50 border border-3 translate-middle-x shadow-lg"
              style={{ width: 50, height: 50 }}
            >
              {initial}
            </div>
          ) : (
            <div
              className="bg-danger d-flex justify-content-center align-items-center text-light fw-bold fs-3 text-uppercase rounded-pill border-secondary user-select-none position-relative top-25 start-50 border border-3 translate-middle-x shadow-lg"
              style={{ width: 50, height: 50 }}
            >
              {initial}
            </div>
          )}
        </a>
      </div>
    </nav>
  );
};

export default MainNavbar;
