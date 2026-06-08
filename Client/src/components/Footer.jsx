import group7 from "../assets/Group7.png";
import facebook from "../assets/facebookIcon.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedIn.png";
import twitter from "../assets/twitter.png";

const HomeFooter = () => {
  const icons = [
    { img: facebook, alt: "facebook", href: "#" },
    { img: twitter, alt: "twitter", href: "#" },
    { img: linkedin, alt: "linkedIn", href: "#" },
    { img: instagram, alt: "instagram", href: "#" },
  ];
  return (
    <footer className="bg-danger">
      <section className="d-flex justify-content-evenly flex-column flex-lg-row pt-5 pb-2">
        <div className="text-center my-3">
          <img src={group7} alt="logo" />
          <div className="d-flex justify-content-evenly align-items-center mt-4 gap-3">
            {icons.map((icon, index) => (
              <a key={index} href={`${icon.href}`}>
                <img src={icon.img} alt={icon.alt} />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center my-3">
          <h4 className="text-light">QUICK LINKS</h4>
          <ul className="d-flex justify-content-center flex-lg-column flex-row gap-2">
            <a
              href="#about"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              About Us
            </a>
            <a
              href="#features"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              Features
            </a>
            <a
              href="#workflow"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              Workflow
            </a>
            <a
              href="#"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              Contact Us
            </a>
          </ul>
        </div>
        <div className="text-center my-3">
          <h4 className="text-light">COMPANY</h4>
          <ul className="d-flex justify-content-evenly flex-lg-column flex-row gap-2">
            <a
              href="#about"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              About Us
            </a>
            <a
              href="#"
              aria-current="page"
              className="link-offset-2 link-underline link-underline-opacity-0 text-light"
            >
              Contact Us
            </a>
          </ul>
        </div>
        <div className="text-center my-3">
          <h4 className="text-light">CONTACT INFO</h4>
          <p className="text-light">Powered by</p>
          <div className="text-light">
            <p className="fw-bold">Phone:</p>
            <div className="d-flex justify-content-center align-items-center gap-3 ">
              <p>7092719486</p>
              <p>9688735554</p>
            </div>
          </div>
          <div className="text-light text-center">
            <p className="fw-bold">Email:</p>
            <p>iknotdigitalsolution@gmail.com</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default HomeFooter;
