import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Alert,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Sidebar, GlassAppBar } from "../../components";
import { colors } from "../../themes";
import {
  ProjectService,
  type Project,
  type CreateProjectData,
} from "../../../services/api/project.service";

const MyProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<CreateProjectData>({
    title: "",
    description: "",
    readme: "",
    proposalFile: "",
    whitePaper: "",
    demoLink: "",
    links: {
      github: "",
      linkedin: "",
      website: "",
      demo: "",
    },
    investmentStatus: "self-sponsored",
    isRegistered: false,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await ProjectService.getMyProjects();
      setProjects(response.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        readme: project.readme || "",
        proposalFile: project.proposalFile || "",
        whitePaper: project.whitePaper || "",
        demoLink: project.demoLink || "",
        links: project.links || {
          github: "",
          linkedin: "",
          website: "",
          demo: "",
        },
        investmentStatus: project.investmentStatus,
        isRegistered: project.isRegistered,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        readme: "",
        proposalFile: "",
        whitePaper: "",
        demoLink: "",
        links: { github: "", linkedin: "", website: "", demo: "" },
        investmentStatus: "self-sponsored",
        isRegistered: false,
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.description) {
        setError("Title and description are required");
        return;
      }

      if (editingProject) {
        await ProjectService.updateProject(editingProject.id, formData);
        setSuccess("Project updated successfully");
      } else {
        await ProjectService.createProject(formData);
        setSuccess("Project created successfully");
      }

      handleCloseDialog();
      loadProjects();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await ProjectService.deleteProject(id);
      setSuccess("Project deleted successfully");
      loadProjects();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete project");
    }
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
        <GlassAppBar title="My Projects" />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {error && (
            <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              onClose={() => setSuccess("")}
              sx={{ mb: 2 }}
            >
              {success}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: colors.text.primary, fontWeight: 700 }}
            >
              All Projects ({projects.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
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
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
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
              {projects.map((project) => (
                <Card
                  key={project.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    border: `1px solid ${colors.primary.lighter}`,
                    boxShadow: "0 2px 8px rgba(110, 199, 126, 0.1)",
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
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}
                    >
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
                        <Chip label="Registered" size="small" color="success" />
                      )}
                    </Box>
                    {project.demoLink && (
                      <Typography
                        variant="caption"
                        sx={{ color: colors.text.muted }}
                      >
                        Demo: {project.demoLink}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(project)}
                      sx={{ color: colors.primary.main }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(project.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
          )}
        </Container>

        {/* Create/Edit Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingProject ? "Edit Project" : "Create New Project"}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Project Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="README"
                value={formData.readme}
                onChange={(e) =>
                  setFormData({ ...formData, readme: e.target.value })
                }
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Proposal File URL"
                  value={formData.proposalFile}
                  onChange={(e) =>
                    setFormData({ ...formData, proposalFile: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="White Paper URL"
                  value={formData.whitePaper}
                  onChange={(e) =>
                    setFormData({ ...formData, whitePaper: e.target.value })
                  }
                />
              </Stack>
              <TextField
                fullWidth
                label="Demo Link"
                value={formData.demoLink}
                onChange={(e) =>
                  setFormData({ ...formData, demoLink: e.target.value })
                }
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  value={formData.links?.github || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, github: e.target.value },
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  value={formData.links?.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, linkedin: e.target.value },
                    })
                  }
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Website URL"
                  value={formData.links?.website || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      links: { ...formData.links, website: e.target.value },
                    })
                  }
                />
                <FormControl fullWidth>
                  <InputLabel>Investment Status</InputLabel>
                  <Select
                    value={formData.investmentStatus}
                    label="Investment Status"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        investmentStatus: e.target.value as any,
                      })
                    }
                  >
                    <MenuItem value="self-sponsored">Self Sponsored</MenuItem>
                    <MenuItem value="looking-for-first-sponsor">
                      Looking for First Sponsor
                    </MenuItem>
                    <MenuItem value="looking-for-more-sponsors">
                      Looking for More Sponsors
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isRegistered}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isRegistered: e.target.checked,
                      })
                    }
                  />
                }
                label="Registered Project"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: colors.primary.main,
                color: colors.text.light,
                textTransform: "none",
                "&:hover": {
                  background: colors.primary.dark,
                },
              }}
            >
              {editingProject ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MyProjectsPage;
