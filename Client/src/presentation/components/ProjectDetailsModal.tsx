import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Divider,
  Stack,
  Link,
} from "@mui/material";
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Language as WebsiteIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { colors } from "../themes";
import { FilePreviewWidget } from "./FilePreviewWidget";
import type { Project, ProjectFile } from "../../services/api/project.service";
import { ProjectService } from "../../services/api/project.service";

interface ProjectDetailsModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  showActions?: boolean;
}

export const ProjectDetailsModal = ({
  open,
  project,
  onClose,
  onEdit,
  onDelete,
  showActions = false,
}: ProjectDetailsModalProps) => {
  if (!project) return null;

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

  const handleDownloadFile = (file: ProjectFile) => {
    ProjectService.downloadFile(file.id, file.originalName);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: 2,
          borderBottom: `1px solid ${colors.primary.lighter}`,
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: colors.text.primary, mb: 1 }}>
            {project.title}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={getInvestmentStatusLabel(project.investmentStatus)}
              size="small"
              sx={{
                backgroundColor: getInvestmentStatusColor(project.investmentStatus),
                color: colors.text.light,
                fontWeight: 500,
              }}
            />
            {project.isRegistered && (
              <Chip label="Registered" size="small" color="success" />
            )}
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: colors.text.secondary }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Description */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: colors.text.primary,
                mb: 1,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.text.secondary, lineHeight: 1.7 }}
            >
              {project.description}
            </Typography>
          </Box>

          {/* README */}
          {project.readme && (
            <>
              <Divider sx={{ borderColor: colors.primary.lighter }} />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: colors.text.primary,
                    mb: 1,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  README
                </Typography>
                <Box
                  sx={{
                    backgroundColor: colors.background.lightGreen,
                    borderRadius: "8px",
                    p: 2,
                    border: `1px solid ${colors.primary.lighter}`,
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.text.secondary,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      fontFamily: "monospace",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.readme}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          {/* Links */}
          {(project.demoLink || project.links?.github || project.links?.linkedin || project.links?.website) && (
            <>
              <Divider sx={{ borderColor: colors.primary.lighter }} />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: colors.text.primary,
                    mb: 2,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Links
                </Typography>
                <Stack spacing={1.5}>
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: colors.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <LinkIcon sx={{ fontSize: 20 }} />
                      <Typography variant="body2">Demo: {project.demoLink}</Typography>
                    </Link>
                  )}
                  {project.links?.github && (
                    <Link
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: colors.text.primary,
                        textDecoration: "none",
                        "&:hover": {
                          color: colors.primary.main,
                        },
                      }}
                    >
                      <GitHubIcon sx={{ fontSize: 20 }} />
                      <Typography variant="body2">{project.links.github}</Typography>
                    </Link>
                  )}
                  {project.links?.linkedin && (
                    <Link
                      href={project.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#0A66C2",
                        textDecoration: "none",
                        "&:hover": {
                          color: colors.primary.main,
                        },
                      }}
                    >
                      <LinkedInIcon sx={{ fontSize: 20 }} />
                      <Typography variant="body2">{project.links.linkedin}</Typography>
                    </Link>
                  )}
                  {project.links?.website && (
                    <Link
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: colors.primary.main,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <WebsiteIcon sx={{ fontSize: 20 }} />
                      <Typography variant="body2">{project.links.website}</Typography>
                    </Link>
                  )}
                </Stack>
              </Box>
            </>
          )}

          {/* Files */}
          {project.files && project.files.length > 0 && (
            <>
              <Divider sx={{ borderColor: colors.primary.lighter }} />
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: colors.text.primary,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Attached Files
                  </Typography>
                  <Chip
                    label={`${project.files.length} file${project.files.length > 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                      backgroundColor: colors.primary.lighter,
                      color: colors.primary.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Stack spacing={2}>
                  {project.files.map((file) => (
                    <FilePreviewWidget
                      key={file.id}
                      file={file}
                      onDownload={handleDownloadFile}
                    />
                  ))}
                </Stack>
              </Box>
            </>
          )}

          {/* No Files Message */}
          {(!project.files || project.files.length === 0) && (
            <>
              <Divider sx={{ borderColor: colors.primary.lighter }} />
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  background: colors.background.lightGreen,
                  borderRadius: "12px",
                  border: `1px dashed ${colors.primary.lighter}`,
                }}
              >
                <Typography variant="body2" sx={{ color: colors.text.muted }}>
                  No files attached to this project yet
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          borderTop: `1px solid ${colors.primary.lighter}`,
          gap: 1,
        }}
      >
        {showActions ? (
          <>
            <Button
              onClick={onClose}
              sx={{
                textTransform: "none",
                color: colors.text.secondary,
                px: 3,
                borderRadius: "8px",
              }}
            >
              Close
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
              onClick={() => onDelete && onDelete(project.id)}
              startIcon={<DeleteIcon />}
              sx={{
                textTransform: "none",
                color: "#f44336",
                px: 3,
                borderRadius: "8px",
                "&:hover": {
                  background: "rgba(244, 67, 54, 0.1)",
                },
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => onEdit && onEdit(project)}
              startIcon={<EditIcon />}
              variant="contained"
              sx={{
                background: colors.primary.main,
                color: colors.text.light,
                textTransform: "none",
                px: 3,
                borderRadius: "8px",
                fontWeight: 600,
                "&:hover": {
                  background: colors.primary.dark,
                },
              }}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              background: colors.primary.main,
              color: colors.text.light,
              textTransform: "none",
              px: 4,
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": {
                background: colors.primary.dark,
              },
            }}
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
