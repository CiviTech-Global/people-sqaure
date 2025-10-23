import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Typography, Container } from "@mui/material";
import { Settings as SettingsIcon, Logout as LogoutIcon, Person as PersonIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GlassAppBar, GlassCard } from "../../components";
import { useAuth } from "../../../context/AuthContext";
import { colors, spacing } from "../../themes";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleSettingsClose();
    navigate("/settings");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", background: colors.background.lightGreen }}>
      <GlassAppBar title="People Square">
        <IconButton
          onClick={handleSettingsClick}
          sx={{
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: "rgba(110, 199, 126, 0.1)",
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          onClick={handleLogout}
          sx={{
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: "rgba(110, 199, 126, 0.1)",
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSettingsClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: colors.background.white,
              boxShadow: "0 4px 20px rgba(110, 199, 126, 0.15)",
              borderRadius: "12px",
              border: "1px solid rgba(110, 199, 126, 0.2)",
              minWidth: 180,
            },
          }}
        >
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon sx={{ color: colors.primary.main }} />
            </ListItemIcon>
            <ListItemText sx={{ color: colors.text.primary }}>Profile</ListItemText>
          </MenuItem>
        </Menu>
      </GlassAppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: colors.text.primary,
              fontWeight: 700,
              mb: spacing.xs,
            }}
          >
            Welcome back, {user?.fullName || "User"}!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.text.secondary,
              fontSize: "1rem",
            }}
          >
            You're part of the People Square community
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } }}>
          <GlassCard>
            <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}>
              Your Role
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {user?.role || "N/A"}
            </Typography>
          </GlassCard>

          <GlassCard>
            <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {user?.email || "N/A"}
            </Typography>
          </GlassCard>

          <GlassCard>
            <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}>
              Member Since
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </Typography>
          </GlassCard>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
