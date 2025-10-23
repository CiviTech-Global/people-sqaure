import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import { colors } from "../../../themes";

interface SidebarProps {
  open?: boolean;
}

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/home",
  },
  {
    text: "My Projects",
    icon: <FolderIcon />,
    path: "/my-projects",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

export const Sidebar = ({ open = true }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: colors.background.white,
        borderRight: `1px solid ${colors.primary.lighter}`,
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${colors.primary.lighter}`,
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.primary.main,
            fontWeight: 700,
            fontSize: open ? "1.5rem" : "1rem",
            transition: "font-size 0.3s ease",
          }}
        >
          {open ? "People Square" : "PS"}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1.5,
                  borderRadius: "12px",
                  py: 1.5,
                  backgroundColor: isActive
                    ? colors.primary.lighter
                    : "transparent",
                  color: isActive ? colors.primary.dark : colors.text.secondary,
                  "&:hover": {
                    backgroundColor: isActive
                      ? colors.primary.lighter
                      : "rgba(110, 199, 126, 0.08)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: open ? 40 : "auto",
                    color: isActive ? colors.primary.main : colors.text.muted,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
