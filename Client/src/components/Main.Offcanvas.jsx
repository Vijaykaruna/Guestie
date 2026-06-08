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

  return (
    <Offcanvas
      show={showOffcanvas}
      onHide={() => setShowOffcanvas(false)}
      placement="end"
    >
      <Offcanvas.Header className="border-bottom" closeButton>
        <Offcanvas.Title>Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <button
          className="btn btn-outline-light btn-sm float-end shadow-lg mx-2"
          onClick={() => setShowModalUser(true)}
        >
          <CiEdit className="fs-5 text-primary" />
        </button>
        <div
          className="bg-primary d-flex justify-content-center align-items-center text-light fw-bold fs-1 text-uppercase rounded-pill user-select-none position-relative top-25 start-50 translate-middle-x shadow-lg"
          style={{
            width: 80,
            height: 80,
          }}
        >
          {initial}
        </div>
        {hotelDetails ? (
          <div key={hotelDetails.userId}>
            <p>Name: {hotelDetails.user}</p>
            <p>Email: {hotelDetails.email}</p>
            <p>Mobile: {hotelDetails.mobile}</p>
            <p>Hotel Name: {hotelDetails.hotel}</p>
            <p>Address: {hotelDetails.address}</p>
          </div>
        ) : (
          <div className="text-center text-secondary my-4">
            <p>"No details available."</p>
            <p className="text-muted">
              Please click the edit button to fill the details for verification.
            </p>
          </div>
        )}
        <button
          className="btn btn-danger rounded-1 position-absolute bottom-0 start-50 translate-middle-x my-3"
          onClick={() => {
            logout(authControl);
          }}
        > <span><TbLogout className="fs-4 text-light"/> Log out</span>
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default MainOffCanvas;
