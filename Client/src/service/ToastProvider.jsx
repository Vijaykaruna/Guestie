import { createContext, useContext, useEffect, useState } from "react";
import CustomToast from "../components/Toast.jsx";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const triggerToast = ({ type, message }) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      {toast && <CustomToast {...toast} onClose={closeToast} />}
    </ToastContext.Provider>
  );
};
