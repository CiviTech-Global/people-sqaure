import { useState } from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const ForgotPasswordVerificationCode = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerifyCode = () => {
    console.log("Verification code:", verificationCode);
    navigate("/set-new-password");
  };

  const handleResendCode = () => {
    console.log("Resend verification code");
    // Resend code logic will be implemented later
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
              alignItems: "center",
              marginBottom: spacing.md,
            }}
          >
            <ArrowBackIcon
              onClick={() => navigate("/forgot-password")}
              sx={{
                color: glassColors.textPrimary,
                cursor: "pointer",
                marginRight: spacing.sm,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: glassColors.textPrimary,
                fontWeight: 700,
                textShadow: shadows.text,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            >
              Verification Code
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: glassColors.textSecondary,
              marginBottom: spacing.xxxl,
              fontSize: { xs: "13px", sm: "14px" },
              lineHeight: 1.6,
            }}
          >
            We've sent a verification code to your email. Please enter the code below to continue
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.xl }}>
              <GlassTextField
                fullWidth
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <KeyIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassButton onClick={handleVerifyCode}>Verify Code</GlassButton>
            </Box>

            <Typography
              sx={{
                color: glassColors.textSecondary,
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Didn't receive the code?{" "}
              <Link
                onClick={handleResendCode}
                sx={{
                  color: glassColors.textPrimary,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Resend
              </Link>
            </Typography>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default ForgotPasswordVerificationCode;
