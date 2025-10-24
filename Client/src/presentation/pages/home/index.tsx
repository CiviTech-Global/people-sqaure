import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  Add as AddIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Sidebar, GlassAppBar, ProjectDetailsModal } from "../../components";
import { useAuth } from "../../../context/AuthContext";
import { colors } from "../../themes";
import {
  ProjectService,
  type Project,
} from "../../../services/api/project.service";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (user?.role === "startup-owner") {
      loadProjects();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      const response = await ProjectService.getMyProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const getInvestmentStatusColor = (status: string) => {
    switch (status) {
      case "self-sponsored":
        return colors.primary.main;
      case "looking-for-first-sponsor":
        return "#FFA726";
      case "looking-for-more-sponsors":
        return "#42A5F5";
      default:
        return colors.text.muted;
    }
  };

  const getInvestmentStatusLabel = (status: string) => {
    switch (status) {
      case "self-sponsored":
        return "Self Sponsored";
      case "looking-for-first-sponsor":
        return "Looking for First Sponsor";
      case "looking-for-more-sponsors":
        return "Looking for More Sponsors";
      default:
        return status;
    }
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
        <GlassAppBar title="Dashboard">
          <IconButton
            onClick={handleSettingsClick}
            sx={{
              color: colors.text.primary,
              "&:hover": {
                backgroundColor: "rgba(110, 199, 126, 0.1)",
              },
            }}
          >
            <PersonIcon />
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
              <ListItemText sx={{ color: colors.text.primary }}>
                Profile
              </ListItemText>
            </MenuItem>
          </Menu>
        </GlassAppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ color: colors.text.primary, fontWeight: 700, mb: 1 }}
            >
              Welcome back, {user?.fullName || "User"}!
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.text.secondary, fontSize: "1rem" }}
            >
              Manage your projects and track your progress
            </Typography>
          </Box>

          {user?.role === "startup-owner" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: colors.text.primary, fontWeight: 600 }}
                >
                  My Projects ({projects.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/my-projects")}
                  sx={{
                    background: colors.primary.main,
                    color: colors.text.light,
                    textTransform: "none",
                    borderRadius: "50px",
                    px: 3,
                    "&:hover": {
                      background: colors.primary.dark,
                    },
                  }}
                >
                  New Project
                </Button>
              </Box>

              {loading ? (
                <Typography sx={{ color: colors.text.secondary }}>
                  Loading projects...
                </Typography>
              ) : projects.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    background: colors.background.white,
                    borderRadius: "16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: colors.text.secondary, mb: 2 }}
                  >
                    No projects yet
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/my-projects")}
                    sx={{
                      borderColor: colors.primary.main,
                      color: colors.primary.main,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: colors.primary.dark,
                        background: colors.primary.lighter,
                      },
                    }}
                  >
                    Create Your First Project
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: 3,
                  }}
                >
                  {projects.slice(0, 6).map((project) => (
                    <Card
                      key={project.id}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "16px",
                        border: `1px solid ${colors.primary.lighter}`,
                        boxShadow: "0 2px 8px rgba(110, 199, 126, 0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 4px 16px rgba(110, 199, 126, 0.2)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardContent sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.text.primary,
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.text.secondary,
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip
                            label={getInvestmentStatusLabel(
                              project.investmentStatus
                            )}
                            size="small"
                            sx={{
                              backgroundColor: getInvestmentStatusColor(
                                project.investmentStatus
                              ),
                              color: colors.text.light,
                              fontWeight: 500,
                            }}
                          />
                          {project.isRegistered && (
                            <Chip
                              label="Registered"
                              size="small"
                              color="success"
                            />
                          )}
                          {project.files && project.files.length > 0 && (
                            <Chip
                              icon={<FileIcon />}
                              label={`${project.files.length} file${project.files.length > 1 ? 's' : ''}`}
                              size="small"
                              sx={{
                                backgroundColor: "#42A5F5",
                                color: colors.text.light,
                                fontWeight: 500,
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleViewDetails(project)}
                          sx={{
                            background: colors.primary.main,
                            color: colors.text.light,
                            textTransform: "none",
                            borderRadius: "8px",
                            py: 1,
                            fontWeight: 600,
                            "&:hover": {
                              background: colors.primary.dark,
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        open={detailsOpen}
        project={selectedProject}
        onClose={handleCloseDetails}
        showActions={false}
      />
    </Box>
  );
};

export default HomePage;
