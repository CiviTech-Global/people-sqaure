import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Settings as SettingsIcon, Logout as LogoutIcon, Person as PersonIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GradientBackground, GlassAppBar } from "../../components";
import { useAuth } from "../../../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
    <Box sx={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
      <GlassAppBar title="Welcome to People Square">
        <IconButton
          onClick={handleSettingsClick}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          onClick={handleLogout}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
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
              backgroundColor: "rgba(102, 126, 234, 0.95)",
              backdropFilter: "blur(20px)",
              color: "white",
              minWidth: 180,
            },
          }}
        >
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
        </Menu>
      </GlassAppBar>
      <GradientBackground>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {/* Content will be added here later */}
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default HomePage;
