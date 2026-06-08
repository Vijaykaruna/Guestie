import { Navigate } from "react-router-dom";
import { useAuth } from "../service/AuthProvider.jsx";
import Loading from "../components/Loading.jsx";

const ProtectedRoute = ({ children }) => {
  const { authorized } = useAuth();

  if (authorized === null) {
    return <Loading message="Checking authentication..."/>
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
