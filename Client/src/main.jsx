import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { ToastProvider } from "./service/ToastProvider.jsx";
import { LoadingProvider } from "./service/LoadingProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ToastProvider>
  </StrictMode>,
);
