import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleResetPassword = () => {
    console.log("Reset password:", formData);
    // Password reset logic will be implemented later
    // After successful reset, navigate to login
    navigate("/login");
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
                textShadow: shadows.text,
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
                    <LockIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
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
                    <LockIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box>
              <GlassButton onClick={handleResetPassword}>Reset Password</GlassButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default SetNewPassword;
