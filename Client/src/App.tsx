import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/authentication/welcomePage";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import ForgotPassword from "./pages/authentication/forgotPassword";
import ForgotPasswordVerificationCode from "./pages/authentication/forgotPasswordVerificationCode";
import SetNewPassword from "./pages/authentication/setNewPasswprd";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-verification" element={<ForgotPasswordVerificationCode />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
