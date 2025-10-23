import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./presentation/components";
import WelcomePage from "./presentation/pages/authentication/welcomePage";
import Login from "./presentation/pages/authentication/login";
import Register from "./presentation/pages/authentication/register";
import ForgotPassword from "./presentation/pages/authentication/forgotPassword";
import ForgotPasswordVerificationCode from "./presentation/pages/authentication/forgotPasswordVerificationCode";
import SetNewPassword from "./presentation/pages/authentication/setNewPasswprd";
import HomePage from "./presentation/pages/home";
import Settings from "./presentation/pages/settings";
import MyProjects from "./presentation/pages/myProjects";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password-verification"
            element={
              <PublicRoute>
                <ForgotPasswordVerificationCode />
              </PublicRoute>
            }
          />
          <Route
            path="/set-new-password"
            element={
              <PublicRoute>
                <SetNewPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-projects"
            element={
              <ProtectedRoute>
                <MyProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
