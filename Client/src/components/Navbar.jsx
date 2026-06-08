import logo from "../assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigation } from "../hooks/useNavigation.js";

function HomeNavbar() {
  const { navigateToLogIn } = useNavigation();
  const navItems = [
    { title: "Home", href: "home" },
    { title: "About", href: "about" },
    { title: "Features", href: "features" },
    { title: "Workflow", href: "workflow" },
    { title: "Pricing", href: "pricing" },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top border-bottom">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold text-center">
            {navItems.map((item, index) => (
              <Nav.Link
                key={index}
                href={`#${item.href}`}
                className="mx-1 nav-links"
              >
                {item.title}
              </Nav.Link>
            ))}
            <button
              type="button"
              className="btn btn-danger mx-4"
              onClick={navigateToLogIn}
            >
              Get a Free Trial
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default HomeNavbar;
