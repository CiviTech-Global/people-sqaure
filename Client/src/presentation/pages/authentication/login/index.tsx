import { useState } from "react";
import { Box, Typography, Container, Link, Checkbox, FormControlLabel, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { GradientBackground, GlassCard, GlassButton, GlassTextField } from "../../../components";
import { glassColors, spacing } from "../../../themes";
import { AuthService } from "../../../../services/api/auth.service";
import { useAuth } from "../../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "rememberMe" ? e.target.checked : e.target.value,
    }));
    setError("");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        login(response.data.token, response.data.user);
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: glassColors.textPrimary,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: spacing.xs,
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
              marginBottom: spacing.xl,
              fontSize: { xs: "13px", sm: "14px" },
            }}
          >
            to your premium account
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
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: glassColors.textSecondary, marginRight: "10px" }} />
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
                    <LockIcon sx={{ color: glassColors.textSecondary, marginRight: "10px" }} />
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
                      color: glassColors.textSecondary,
                      "&.Mui-checked": {
                        color: "#6EC77E",
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
              <GlassButton onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </GlassButton>
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
