import { useState } from "react";
import { Box, Tabs, Tab, IconButton, Container } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GlassAppBar } from "../../components";
import { useAuth } from "../../../context/AuthContext";
import { colors } from "../../themes";
import Profile from "./profile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
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
    <Box sx={{ minHeight: "100vh", width: "100%", background: colors.background.lightGreen }}>
      <GlassAppBar title="Settings">
        <IconButton
          onClick={handleBackToDashboard}
          sx={{
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: "rgba(110, 199, 126, 0.1)",
            },
          }}
          aria-label="Back to Dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleLogout}
          sx={{
            color: colors.text.primary,
            "&:hover": {
              backgroundColor: "rgba(110, 199, 126, 0.1)",
            },
          }}
          aria-label="Logout"
        >
          <LogoutIcon />
        </IconButton>
      </GlassAppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                color: colors.text.secondary,
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                "&.Mui-selected": {
                  color: colors.primary.main,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: colors.primary.main,
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
      </Container>
    </Box>
  );
};

export default Settings;
