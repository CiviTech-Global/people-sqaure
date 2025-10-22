import { useState } from "react";
import { Box, Typography, Container, Link, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "rememberMe" ? e.target.checked : e.target.value,
    }));
  };

  const handleLogin = () => {
    console.log("Login attempt:", formData);
    // Login logic will be implemented later
    // For now, navigate to home page after login
    navigate("/home");
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
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: glassColors.textPrimary,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: spacing.sm,
              textShadow: shadows.text,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            Login
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: glassColors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.xxxl,
              fontSize: { xs: "13px", sm: "14px" },
            }}
          >
            Welcome back! Please login to your account
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassTextField
                fullWidth
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.md }}>
              <GlassTextField
                fullWidth
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange("password")}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: spacing.xl,
                flexWrap: "wrap",
                gap: spacing.xs,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rememberMe}
                    onChange={handleInputChange("rememberMe")}
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      "&.Mui-checked": {
                        color: glassColors.textPrimary,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: glassColors.textSecondary, fontSize: "14px" }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                onClick={() => navigate("/forgot-password")}
                sx={{
                  color: glassColors.textPrimary,
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassButton onClick={handleLogin}>Login</GlassButton>
            </Box>

            <Typography
              sx={{
                color: glassColors.textSecondary,
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
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
                Register
              </Link>
            </Typography>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default Login;
