import { useState } from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    console.log("Send verification code to:", email);
    navigate("/forgot-password-verification");
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
              onClick={() => navigate("/login")}
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
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              }}
            >
              Forgot Password
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
            Enter your email address and we'll send you a verification code to reset your password
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.xl }}>
              <GlassTextField
                fullWidth
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassButton onClick={handleSendCode}>Send Verification Code</GlassButton>
            </Box>

            <Typography
              sx={{
                color: glassColors.textSecondary,
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Remember your password?{" "}
              <Link
                onClick={() => navigate("/login")}
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
                Login
              </Link>
            </Typography>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default ForgotPassword;
