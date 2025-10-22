import { useState } from "react";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GradientBackground, GlassAppBar } from "../../components";
import { useAuth } from "../../../context/AuthContext";
import Profile from "./profile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleBackToDashboard = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
      <GlassAppBar title="Settings">
        <IconButton
          onClick={handleBackToDashboard}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          aria-label="Back to Dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleLogout}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          aria-label="Logout"
        >
          <LogoutIcon />
        </IconButton>
      </GlassAppBar>
      <GradientBackground>
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", pt: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.7)",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#ffffff",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffffff",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label="Profile" />
          </Tabs>
          <TabPanel value={currentTab} index={0}>
            <Profile />
          </TabPanel>
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default Settings;
