import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Guest from "./pages/Guest/Guest.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/guest/home/demo" replace />} />
        <Route path="/guest/home/:userId" element={<Guest />} />
        <Route path="*" element={<Navigate to="/guest/home/demo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
