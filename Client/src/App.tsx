import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./presentation/pages/authentication/welcomePage";
import Login from "./presentation/pages/authentication/login";
import Register from "./presentation/pages/authentication/register";
import ForgotPassword from "./presentation/pages/authentication/forgotPassword";
import ForgotPasswordVerificationCode from "./presentation/pages/authentication/forgotPasswordVerificationCode";
import SetNewPassword from "./presentation/pages/authentication/setNewPasswprd";
import HomePage from "./presentation/pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-verification"
          element={<ForgotPasswordVerificationCode />}
        />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
