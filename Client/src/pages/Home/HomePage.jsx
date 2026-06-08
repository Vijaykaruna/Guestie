import logo from "../../assets/logo.png";
import Question from "../../assets/Questions.gif";
import QRCode from "../../assets/QRCode.gif";
import Menu from "../../assets/Menu.gif";
import SiteStatus from "../../assets/SiteStats.gif";
import Signup from "../../assets/Signup.gif";
import Wallpost from "../../assets/Wallpost.gif";
import Dashboard from "../../assets/Dashboard.gif";
import Orderhead from "../../assets/Orderahead.gif";
import group5 from "../../assets/Group 5.png";
import arrowRight from "../../assets/arrow2.png";
import arrowDown from "../../assets/arrow.png";
import pricing from "../../assets/Pricingplans.gif";
import Container from "react-bootstrap/Container";
import HomeNavbar from "../../components/Navbar.jsx";
import HomeFooter from "../../components/Footer.jsx";
import { useLoading } from "../../service/LoadingProvider.jsx";
import { useNavigation } from "../../hooks/useNavigation.js";
import { useCallback } from "react";
import "../../App.css";

function HomePage() {
  const { navigateToLogIn } = useNavigation();

  const { showLoading, hideLoading, isLoading } = useLoading();

  const navigateLogin = useCallback(() => {
    showLoading("Redirecting...");
    setTimeout(() => {
      navigateToLogIn();
      hideLoading();
    }, 800);
  }, [navigateToLogIn]);

  return (
    <>
      <div className={isLoading ? "blur-ui" : ""}>
        <HomeNavbar />
        <Container id="home" className="my-5 py-5">
          <section className="d-flex justify-content-evenly align-items-center flex-column flex-lg-row mt-5 pt-3">
            <div className="w-lg-100 w-75">
              <h1 className="fw-bold w-75 text-danger">
                Enhance your Guest Experience with
                <img src={logo} alt="logo" className="img-fluid" />
              </h1>
              <div className="mb-4 pt-3">
                <h4 className="">
                  Elevate guest satisfaction with seamless in-room ordering for
                  gourmet meals and exclusive services, all at a simple tap.
                </h4>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-lg rounded-pill my-3"
                onClick={navigateToLogIn}
              >
                Get a Free Trial
              </button>
            </div>
            <div>
              <img src={group5} alt="main photo" className="img-fluid" />
            </div>
          </section>
        </Container>
        <div className="border border-bottom my-5"></div>
        <Container id="about" className="py-2">
          <section className="d-flex justify-content-evenly align-items-center flex-column flex-lg-row mt-5 pt-3">
            <div className="pb-5">
              <img src={Question} alt="about image" className="img-fluid" />
            </div>
            <div className="w-lg-100 w-75 pl-5 mb-4">
              <h1 className="fw-bold w-100 text-secondary pb-4">
                Why <span className="text-danger">Guestie.</span>
              </h1>
              <div>
                <ul className="text-danger ">
                  <li>
                    <h4>
                      Guestie transforms resort dining with in-room ordering of
                      gourmet meals and services through QR code scanning.
                    </h4>
                  </li>
                  <br />
                  <li>
                    <h4>
                      With Guestie, guests can enjoy the convenience of browsing
                      an interactive menu, placing orders all from the comfort
                      of the room.
                    </h4>
                  </li>
                  <br />
                  <li>
                    <h4>
                      Guestie streamlines ordering, enhancing guest satisfaction
                      and leaving a lasting impression.
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Container>
        <div className="border border-bottom my-5"></div>
        <Container id="features" className="pt-5">
          <section className="pt-5">
            <h1 className="fw-bold w-100 text-secondary pb-4 text-center">
              Feat<span className="text-danger">ures</span>
            </h1>
            <div className="d-flex justify-content-evenly align-items-center flex-column flex-lg-row text-center">
              <div className=" mx-5 mb-5">
                <img src={QRCode} alt="QR code" className="img-fluid mb-3" />
                <h5>QR Based in-Room Food ordering</h5>
              </div>
              <div className="mx-5 mb-5">
                <img
                  src={SiteStatus}
                  alt="Site status"
                  className="img-fluid mb-3"
                />
                <h5>Comprehensive Admin Dashboard</h5>
              </div>
              <div className=" mx-5 mb-5">
                <img src={Menu} alt="Menu" className="img-fluid mb-3" />
                <h5>Menu and Order Management</h5>
              </div>
            </div>
          </section>
        </Container>
        <div className="border border-bottom my-5"></div>
        <Container id="workflow" className="pt-5">
          <section className="pt-5">
            <h1 className="fw-bold w-100 text-secondary pb-4 text-center">
              Work<span className="text-danger">flow</span>
            </h1>
            <div className="d-flex justify-content-evenly align-items-center flex-column flex-lg-row text-center">
              <div className="my-3 mx-3">
                <img src={Signup} alt="Menu" className="img-fluid mb-3" />
                <h5>Creating Account with Guestie</h5>
              </div>
              <img
                src={arrowDown}
                alt="move"
                className="img-fluid d-lg-none d-xxl-block"
              />
              <img
                src={arrowRight}
                alt="move"
                className="img-fluid d-none d-lg-block"
              />
              <div className="my-3 mx-3">
                <img src={Dashboard} alt="Menu" className="img-fluid mb-3" />
                <h5>Sign in to your Dashboard</h5>
              </div>
              <img
                src={arrowDown}
                alt="move"
                className="img-fluid d-lg-none d-xxl-block"
              />
              <img
                src={arrowRight}
                alt="move"
                className="img-fluid d-none d-lg-block"
              />
              <div className="my-3 mx-3">
                <img src={Menu} alt="Menu" className="img-fluid mb-3" />
                <h5>Menu Updation</h5>
              </div>
              <img
                src={arrowDown}
                alt="move"
                className="img-fluid d-lg-none d-xxl-block"
              />
              <img
                src={arrowRight}
                alt="move"
                className="img-fluid d-none d-lg-block"
              />
              <div className="my-3 mx-3">
                <img src={Wallpost} alt="Menu" className="img-fluid mb-3" />
                <h5>Get the QR and Place inside the rooms</h5>
              </div>
              <img
                src={arrowDown}
                alt="move"
                className="img-fluid d-lg-none d-xxl-block"
              />
              <img
                src={arrowRight}
                alt="move"
                className="img-fluid d-none d-lg-block"
              />
              <div className="my-3 mx-3">
                <img src={Orderhead} alt="Menu" className="img-fluid mb-3" />
                <h5>Get & track your orders via Dashboard</h5>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                type="button"
                className="btn btn-danger btn-lg rounded-pill my-3"
                onClick={navigateLogin}
              >
                Get a Free Trial
              </button>
            </div>
          </section>
        </Container>
        <div id="pricing" className="border border-bottom my-5"></div>
        <Container>
          <section>
            <h1 className="fw-bold w-100 text-secondary py-4 text-center">
              Pricing<span className="text-danger"> plans</span>
            </h1>
            <div className="d-flex justify-content-evenly align-items-center flex-column flex-lg-row mb-3 gap-3">
              <div className="card shadow" style={{ width: "18rem" }}>
                <img
                  className="card-img-top imf-fluid p-5"
                  src={pricing}
                  alt="price"
                />
                <div className="card-body">
                  <h5 className="card-title">1 MONTH</h5>
                  <h2 className="fw-bold">
                    1500 INR/<span>month</span>
                  </h2>
                  <p className="card-text fw-bold">Taxes may apply</p>
                  <button
                    className="btn btn-danger mt-4"
                    onClick={navigateLogin}
                  >
                    Subcribe now
                  </button>
                </div>
              </div>
              <div className="card shadow" style={{ width: "18rem" }}>
                <img
                  className="card-img-top img-fluid p-5"
                  src={pricing}
                  alt="price"
                />
                <div className="card-body">
                  <h5 className="card-title">6 MONTH</h5>
                  <h2 className="fw-bold">
                    1350 INR/<span>month</span>
                  </h2>
                  <p className="fw-bold">SAVE 150 INR per month</p>
                  <p className="card-text fw-bold">Taxes may apply</p>
                  <button className="btn btn-danger" onClick={navigateLogin}>
                    Subcribe now
                  </button>
                </div>
              </div>
              <div className="card shadow" style={{ width: "18rem" }}>
                <img
                  className="card-img-top img-fluid p-5"
                  src={pricing}
                  alt="price"
                />
                <div className="card-body">
                  <h5 className="card-title">12 MONTH</h5>
                  <h2 className="fw-bold">
                    1250 INR/<span>month</span>
                  </h2>
                  <p className="fw-bold">SAVE 250 INR per month</p>
                  <p className="card-text fw-bold">Taxes may apply</p>
                  <button className="btn btn-danger" onClick={navigateLogin}>
                    Subcribe now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Container>
        <HomeFooter />
      </div>
    </>
  );
}
export default HomePage;
