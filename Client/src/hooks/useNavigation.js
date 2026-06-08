import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/login");
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const navigateToMain = () => {
    navigate("/main");
  };

  const navigateToGuestCart = () => {
    navigate("/guest-cart");
  }

  return {
    navigateToLogIn,
    navigateToSignUp,
    navigateToMain,
    navigateToGuestCart,
  };
};
