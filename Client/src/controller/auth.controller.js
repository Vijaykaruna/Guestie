import { api } from "../api/axios.js";
import { useNavigation } from "../hooks/useNavigation.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const authController = ({ triggerToast } = {}) => {
  const { navigateToMain, navigateToLogIn } = useNavigation();

  const { showLoading, hideLoading } = useLoading();

  const login = async ({ email, password }) => {
    showLoading("Logging in...");
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        triggerToast({
          type: "success",
          message: res.data.message || "Logged in Successfully",
        });

        navigateToMain();
      }
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Login failed",
      });
    } finally {
      hideLoading();
    }
  };

  const signup = async ({ name, email, password }) => {
    showLoading("Creating account...");
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      if (res.status === 200) {
        triggerToast({
          type: "success",
          message: "Account created Successfully",
        });
        navigateToLogIn();
      }
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Signup failed",
      });
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    showLoading("Logging out...");
    try {
      const res = await api.post("/auth/logout");
      triggerToast({
        type: "success",
        message: res.data.message || "Logged out successfully",
      });
    } catch (err) {
      triggerToast({
        type: "danger",
        message: "Logout failed",
      });
    } finally {
      hideLoading();
    }
  };

  return {
    login,
    signup,
    logout,
  };
};
