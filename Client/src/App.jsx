import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./service/AuthProvider.jsx";
import "./App.css";

import HomePage from "./pages/Home/HomePage.jsx";
import LogIn from "./pages/Authentication/LogIn.jsx";
import SignUp from "./pages/Authentication/SignUp.jsx";

import MainPage from "./pages/MainPage/MainPage.jsx";
// import Guest from "./pages/Guest/Guest.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/guest/home/:userId" element={<Guest />} /> */}

        {/* PROTECTED ROUTES */}
        <Route
          path="/main"
          element={
            <AuthProvider>
              <ProtectedRoute>
                <MainPage/>
              </ProtectedRoute>
            </AuthProvider>
          }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
