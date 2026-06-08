import { createContext, useContext, useState } from "react";
import Loading from "../components/Loading.jsx";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const showLoading = (msg = "Loading...") => {
    setMessage(msg);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setMessage("Loading...");
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
      {isLoading && <Loading message={message} />}
    </LoadingContext.Provider>
  );
};
