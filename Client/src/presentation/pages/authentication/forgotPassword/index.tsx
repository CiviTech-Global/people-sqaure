import { useState } from "react";
import { Box, Typography, Container, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, spacing } from "../../../themes";
import { AuthService } from "../../../../services/api/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      setLoading(true);
      setError("");

      if (!email) {
        setError("Please enter your email");
        return;
      }

      await AuthService.forgotPassword({ email });
      navigate("/forgot-password-verification", { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send verification code. Please try again.");
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

          {error && (
            <Alert severity="error" sx={{ marginBottom: spacing.lg }}>
              {error}
            </Alert>
          )}

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
                    <EmailIcon sx={{ color: glassColors.textSecondary, marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassButton onClick={handleSendCode} disabled={loading}>
                {loading ? "Sending..." : "Send Verification Code"}
              </GlassButton>
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
