import login from "../../assets/Login.gif";
import logo from "../../assets/logo.png";
import user from "../../assets/user2.png";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

import { useLogIn } from "../../hooks/useAuthenticate.js";

import { useLoading } from "../../service/LoadingProvider.jsx";

const LogIn = () => {
 
  const { formFields, handleLogin } = useLogIn();

  const { isLoading } = useLoading();

  return (
    <>
      <div className={isLoading ? "blur-ui" : ""}>
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center flex-column flex-lg-row gap-5">
          <div className="border bg-light p-3 rounded-3 col-12 shadow-lg col-lg-6">
            <h4 className="border-bottom my-4 pb-4 text-danger fw-bold">
              Welcome <span className="text-secondary">Back,</span>
            </h4>
            <div className="d-flex gap-4 align-items-center ps-5">
              <img
                src={user}
                alt="user"
                className="img-fluid border rounded-pill p-1"
              />
              <p className="text-wrap mt-3">
                <span className="fw-bold h5">
                  Hello, <span className="text-danger">User</span>
                </span>
              </p>
            </div>
            <form onSubmit={handleLogin}>
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
              <div className="float-end">
                <span className="px-4">
                  <Link
                    to="/signup"
                    className="text-decoration-none text-danger"
                  >
                    Don't have an account?
                  </Link>
                </span>
              </div>
              <div className="my-5 px-4 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn bg-danger text-light fw-bold px-lg-5 px-3 py-lg-3 rounded-pill"
                >
                  {isLoading ? "Logging in..." : "Login"}
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

export default LogIn;
