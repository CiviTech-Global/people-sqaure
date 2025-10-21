import { useState } from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRegister = () => {
    console.log("Register attempt:", formData);
    // Registration logic will be implemented later
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
            Register
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
            Create your account to get started
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassTextField
                fullWidth
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

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

            <Box sx={{ marginBottom: spacing.lg }}>
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

            <Box sx={{ marginBottom: spacing.xl }}>
              <GlassTextField
                fullWidth
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                InputProps={{
                  startAdornment: (
                    <LockIcon sx={{ color: "rgba(255, 255, 255, 0.6)", marginRight: "10px" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ marginBottom: spacing.lg }}>
              <GlassButton onClick={handleRegister}>Register</GlassButton>
            </Box>

            <Typography
              sx={{
                color: glassColors.textSecondary,
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Already have an account?{" "}
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

export default Register;
