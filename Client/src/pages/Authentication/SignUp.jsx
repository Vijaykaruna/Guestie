import login from "../../assets/Login.gif";
import logo from "../../assets/logo.png";
import user from "../../assets/user2.png";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { Link } from "react-router-dom";

import { useSignUp } from "../../hooks/useAuthenticate.js";

import { useLoading } from "../../service/LoadingProvider.jsx";

const SignUp = () => {

  const { formFields, handleSignup } = useSignUp();

  const { isLoading } = useLoading();

  return (
    <>
      <div className={isLoading ? "blur-ui" : ""}>
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center flex-column flex-lg-row gap-5">
          <div className="border p-3 bg-light rounded-3 col-12 shadow-lg col-lg-6 mt-5">
            <p className="h3 fw-bold text-danger border-bottom my-4 pb-4">
              SignUp <span className="text-secondary">Page</span>
            </p>
            <div className="text-center">
              <img
                src={user}
                alt="user"
                className="img-fluid border rounded-pill p-1"
              />
            </div>
            <form onSubmit={handleSignup}>
              {formFields.map((field) => (
                <div className="mt-3 px-4" key={field.id}>
                  <FloatingLabel controlId={field.id} label={field.label}>
                    <Form.Control
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                  </FloatingLabel>
                </div>
              ))}
              <span className="px-4 float-end">
                <Link to="/login" className="text-decoration-none text-danger">
                  Already have an account?
                </Link>
              </span>
              <div className="d-flex gap-3 mt-5 mb-2 px-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn bg-danger mx-auto text-light fw-bold px-lg-5 px-3 py-lg-3 rounded-pill"
                >
                  {isLoading ? "Please wait..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
          <div className="text-center">
            <div>
              <img src={logo} alt="logo" className="img-fluid" />
            </div>
            <img src={login} alt="login icon" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
