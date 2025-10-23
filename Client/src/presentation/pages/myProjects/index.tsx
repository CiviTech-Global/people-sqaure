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
  Switch,
  FormControlLabel,
  Stack,
  LinearProgress,
  FormHelperText,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Delete as RemoveIcon,
} from "@mui/icons-material";
import { Sidebar, GlassAppBar, StyledAlert } from "../../components";
import { colors } from "../../themes";
import {
  ProjectService,
  type Project,
  type CreateProjectData,
} from "../../../services/api/project.service";

interface FormErrors {
  title?: string;
  description?: string;
  demoLink?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

const MyProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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

  // File upload states
  const [proposalFileObj, setProposalFileObj] = useState<File | null>(null);
  const [whitePaperObj, setWhitePaperObj] = useState<File | null>(null);

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

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }

    if (formData.demoLink && formData.demoLink.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(formData.demoLink)) {
        errors.demoLink = "Invalid URL format";
      }
    }

    if (formData.links?.github && formData.links.github.trim()) {
      if (!formData.links.github.includes("github.com")) {
        errors.github = "Invalid GitHub URL";
      }
    }

    if (formData.links?.linkedin && formData.links.linkedin.trim()) {
      if (!formData.links.linkedin.includes("linkedin.com")) {
        errors.linkedin = "Invalid LinkedIn URL";
      }
    }

    if (formData.links?.website && formData.links.website.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(formData.links.website)) {
        errors.website = "Invalid website URL";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
    setProposalFileObj(null);
    setWhitePaperObj(null);
    setFormErrors({});
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
    setProposalFileObj(null);
    setWhitePaperObj(null);
    setFormErrors({});
  };

  const handleFileUpload = async (
    file: File,
    field: "proposalFile" | "whitePaper"
  ) => {
    try {
      setUploading(true);
      const response = await ProjectService.uploadFile(file);
      setFormData({ ...formData, [field]: response.data.url });
      setSuccess(`${field === "proposalFile" ? "Proposal" : "White Paper"} uploaded successfully`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to upload ${field === "proposalFile" ? "proposal" : "white paper"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileRemove = (field: "proposalFile" | "whitePaper") => {
    setFormData({ ...formData, [field]: "" });
    if (field === "proposalFile") {
      setProposalFileObj(null);
    } else {
      setWhitePaperObj(null);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    try {
      // Upload files if new ones were selected
      if (proposalFileObj) {
        await handleFileUpload(proposalFileObj, "proposalFile");
      }
      if (whitePaperObj) {
        await handleFileUpload(whitePaperObj, "whitePaper");
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
            <StyledAlert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
              {error}
            </StyledAlert>
          )}
          {success && (
            <StyledAlert
              severity="success"
              onClose={() => setSuccess("")}
              sx={{ mb: 2 }}
            >
              {success}
            </StyledAlert>
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
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: `0 4px 12px ${colors.primary.main}40`,
                "&:hover": {
                  background: colors.primary.dark,
                  boxShadow: `0 6px 16px ${colors.primary.main}60`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
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
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
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
                  <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end", gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog(project)}
                      sx={{
                        color: colors.primary.main,
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": {
                          background: colors.primary.lighter,
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(project.id)}
                      sx={{
                        color: "#f44336",
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 2,
                        "&:hover": {
                          background: "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      Delete
                    </Button>
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
            sx:{
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingProject ? "Edit Project" : "Create New Project"}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {uploading && <LinearProgress />}
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Project Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                error={!!formErrors.title}
                helperText={formErrors.title}
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
                error={!!formErrors.description}
                helperText={formErrors.description}
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
                placeholder="Detailed project information, setup instructions, etc."
              />

              {/* Proposal File Upload */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Proposal File (PDF, DOC, DOCX, PPT, PPTX)
                </Typography>
                {formData.proposalFile ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DescriptionIcon sx={{ color: colors.primary.main }} />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {formData.proposalFile}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleFileRemove("proposalFile")}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
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
                    Upload Proposal
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProposalFileObj(file);
                          handleFileUpload(file, "proposalFile");
                        }
                      }}
                    />
                  </Button>
                )}
              </Box>

              {/* White Paper Upload */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  White Paper (PDF, DOC, DOCX, PPT, PPTX)
                </Typography>
                {formData.whitePaper ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <DescriptionIcon sx={{ color: colors.primary.main }} />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {formData.whitePaper}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleFileRemove("whitePaper")}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
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
                    Upload White Paper
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setWhitePaperObj(file);
                          handleFileUpload(file, "whitePaper");
                        }
                      }}
                    />
                  </Button>
                )}
              </Box>

              <TextField
                fullWidth
                label="Demo Link"
                value={formData.demoLink}
                onChange={(e) =>
                  setFormData({ ...formData, demoLink: e.target.value })
                }
                error={!!formErrors.demoLink}
                helperText={formErrors.demoLink}
                placeholder="https://demo.yourproject.com"
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
                  error={!!formErrors.github}
                  helperText={formErrors.github}
                  placeholder="https://github.com/username/repo"
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
                  error={!!formErrors.linkedin}
                  helperText={formErrors.linkedin}
                  placeholder="https://linkedin.com/in/username"
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
                  error={!!formErrors.website}
                  helperText={formErrors.website}
                  placeholder="https://yourproject.com"
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
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: colors.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: colors.primary.main,
                        },
                    }}
                  />
                }
                label="Registered Project"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, gap: 1 }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                textTransform: "none",
                color: colors.text.secondary,
                px: 3,
                py: 1,
                borderRadius: "8px",
                "&:hover": {
                  background: colors.background.lightGreen,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={uploading}
              sx={{
                background: colors.primary.main,
                color: colors.text.light,
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "8px",
                fontWeight: 600,
                boxShadow: `0 2px 8px ${colors.primary.main}40`,
                "&:hover": {
                  background: colors.primary.dark,
                  boxShadow: `0 4px 12px ${colors.primary.main}60`,
                },
                "&:disabled": {
                  background: colors.text.muted,
                  color: colors.text.light,
                },
              }}
            >
              {uploading
                ? "Uploading..."
                : editingProject
                ? "Update Project"
                : "Create Project"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MyProjectsPage;
