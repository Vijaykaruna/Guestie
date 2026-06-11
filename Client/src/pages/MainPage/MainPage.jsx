import MainModalUser from "../../components/Main.ModalUser.jsx";
import MainNavbar from "../../components/Main.Navbar.jsx";
import MainOffCanvas from "../../components/Main.Offcanvas.jsx";

import { useAuth } from "../../service/AuthProvider.jsx";
import { useMainPage } from "../../hooks/useMainPage.js";

import { useToast } from "../../service/ToastProvider.jsx";
import { useLoading } from "../../service/LoadingProvider.jsx";

import { authController } from "../../controller/auth.controller.js";
import { hotelController } from "../../controller/hotel.controller.js";
import { orderController } from "../../controller/order.controller.js";
import { foodController } from "../../controller/food.controller.js";
import { reviewController } from "../../controller/review.controller.js";
import { guestController } from "../../controller/guest.controller.js";

import Dashboard from "../Dashboard/Dashboard.jsx";
import FoodPage from "../FoodPage/FoodPage.jsx";
import ReviewPage from "../ReviewPage/ReviewPage.jsx";
import OrderPage from "../OrderPage/OrderPage.jsx";
import InvoicePage from "../InvoicePage/InvoicePage.jsx";
import GuestPage from "../GuestPage/GuestPage.jsx";
import Hotel from "../HotelPage/HotelPage.jsx";
import QRModal from "../../components/ModalQR.jsx";

const MainPage = () => {
  const useAuthentication = useAuth();
  const useMain = useMainPage({ useAuthentication });
  const { isLoading } = useLoading();
  const { triggerToast } = useToast();

  const authControl = authController({ triggerToast });
  const hotelControl = hotelController({ triggerToast });
  const orderControl = orderController({ triggerToast });
  const foodControl = foodController({ triggerToast });
  const reviewControl = reviewController({ triggerToast });
  const guestControl = guestController({ triggerToast });

  const { activeLink, menuItems, handleMenu, refreshTick } = useMain;

  return (
    <div className={isLoading ? "blur-ui" : ""}>
      <div className="container-fluid admin-shell">
        <MainNavbar useMain={useMain} hotelControl={hotelControl} />
        <div className="row flex-nowrap admin-layout">

          {/* Sidebar — visible on tablet/laptop only */}
          <aside className="admin-sidebar d-none d-md-block">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-2 px-sm-3 pt-3 min-vh-100">
              <div className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-stretch w-100 gap-2">
                {menuItems.map(({ href, img, label }) => (
                  <a
                    key={href}
                    href={href}
                    className={`nav-link align-middle shadow-sm main-item ${activeLink === href ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenu(href);
                    }}
                  >
                    <img src={img} alt={`${label.toLowerCase()} icon`} className="sidebar-icon" />
                    <span className="ms-1 d-none d-sm-inline">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="admin-main py-3 pb-md-3 pb-5">
            {activeLink === "#dashboard" && (
              <Dashboard hotelControl={hotelControl} orderControl={orderControl} triggerToast={triggerToast} refreshTick={refreshTick} />
            )}
            {activeLink === "#foods" && (
              <FoodPage foodControl={foodControl} refreshTick={refreshTick} />
            )}
            {activeLink === "#review" && (
              <ReviewPage reviewControl={reviewControl} refreshTick={refreshTick} />
            )}
            {activeLink === "#orderList" && (
              <OrderPage orderControl={orderControl} refreshTick={refreshTick} />
            )}
            {activeLink === "#invoice" && (
              <InvoicePage guestControl={guestControl} refreshTick={refreshTick} />
            )}
            {activeLink === "#guest" && (
              <GuestPage guestControl={guestControl} triggerToast={triggerToast} refreshTick={refreshTick} />
            )}
            {activeLink === "#subcription" && (
              <Hotel hotelControl={hotelControl} useAuth={useAuthentication} refreshTick={refreshTick} onEditProfile={() => useMain.setShowModalUser(true)} />
            )}

            <MainOffCanvas useMain={useMain} hotelControl={hotelControl} authControl={authControl} />
            <MainModalUser useMain={useMain} hotelControl={hotelControl} />
            <QRModal useMain={useMain} />
          </main>
        </div>

        {/* Bottom Navigation — mobile only */}
        <nav className="mobile-bottom-nav d-flex d-md-none">
          {menuItems.map(({ href, img, label }) => (
            <button
              key={href}
              className={`mobile-bottom-item ${activeLink === href ? "active" : ""}`}
              onClick={() => handleMenu(href)}
            >
              <img src={img} alt={label} className="mobile-bottom-icon" />
              <span className="mobile-bottom-label">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
