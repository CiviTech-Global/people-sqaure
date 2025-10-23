import { useState } from "react";
import { Box, Typography, Container, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, spacing } from "../../../themes";
import { AuthService } from "../../../../services/api/auth.service";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError("");
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.newPassword || !formData.confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.newPassword.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      await AuthService.resetPassword({
        email,
        newPassword: formData.newPassword,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <Container
        maxWidth="sm"
        sx={{
          padding: { xs: "16px", sm: "20px" },
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <GlassCard maxWidth="450px">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: spacing.md,
            }}
          >
            <CheckCircleIcon
              sx={{
                color: glassColors.textPrimary,
                fontSize: { xs: "48px", sm: "56px" },
                marginBottom: spacing.md,
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))",
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: glassColors.textPrimary,
                fontWeight: 700,
                textAlign: "center",
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              }}
            >
              Set New Password
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: glassColors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.xxxl,
              fontSize: { xs: "13px", sm: "14px" },
              lineHeight: 1.6,
            }}
          >
            Your identity has been verified. Please set your new password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: spacing.lg }}>
              {error}
            </Alert>
          )}

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassTextField
                fullWidth
                type="password"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleInputChange("newPassword")}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: glassColors.textSecondary, marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.xl }}>
              <GlassTextField
                fullWidth
                type="password"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: glassColors.textSecondary, marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box>
              <GlassButton onClick={handleResetPassword} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </GlassButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default SetNewPassword;
