import { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { Sidebar, GlassAppBar } from "../../components";
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
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: colors.background.lightGreen,
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, marginLeft: "260px" }}>
        <GlassAppBar title="Settings" />
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
    </Box>
  );
};

export default Settings;
