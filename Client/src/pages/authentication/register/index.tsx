import { useState } from "react";
import { Box, Typography, Container, Link, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
  GradientBackground,
  GlassCard,
  GlassButton,
  GlassTextField,
  GlassSelect,
  MenuItem,
} from "../../../components";
import { glassColors, shadows, spacing } from "../../../themes";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRoleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleRegister = () => {
    console.log("Register attempt:", formData);
    // Registration logic will be implemented later
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "startup-owner":
        return <RocketLaunchIcon sx={{ fontSize: "20px" }} />;
      case "investor":
        return <AccountBalanceIcon sx={{ fontSize: "20px" }} />;
      case "organization":
        return <BusinessIcon sx={{ fontSize: "20px" }} />;
      case "citizen":
        return <LightbulbIcon sx={{ fontSize: "20px" }} />;
      default:
        return <WorkIcon sx={{ fontSize: "20px" }} />;
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
        <GlassCard maxWidth="500px">
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
              <GlassSelect
                fullWidth
                value={formData.role}
                onChange={handleRoleChange}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    {formData.role ? (
                      getRoleIcon(formData.role)
                    ) : (
                      <WorkIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
                    )}
                  </InputAdornment>
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Select Your Role
                      </Typography>
                    );
                  }
                  const roleLabels: { [key: string]: string } = {
                    "startup-owner": "Startup Owners/Developers",
                    investor: "Investors, Sponsors, Venture Capitalists, etc.",
                    organization: "Organizations and Enterprises",
                    citizen: "Citizen with a Challenge/Issue/Demand",
                  };
                  return roleLabels[selected as string];
                }}
              >
                <MenuItem value="startup-owner">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <RocketLaunchIcon sx={{ fontSize: "20px" }} />
                    <Typography>Startup Owners/Developers</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="investor">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <AccountBalanceIcon sx={{ fontSize: "20px" }} />
                    <Typography>Investors, Sponsors, Venture Capitalists, etc.</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="organization">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <BusinessIcon sx={{ fontSize: "20px" }} />
                    <Typography>Organizations and Enterprises</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="citizen">
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <LightbulbIcon sx={{ fontSize: "20px" }} />
                    <Typography>Citizen with a Challenge/Issue/Demand</Typography>
                  </Box>
                </MenuItem>
              </GlassSelect>
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
