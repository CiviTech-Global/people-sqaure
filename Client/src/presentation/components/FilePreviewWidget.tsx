import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { colors } from "../themes";
import type { ProjectFile } from "../../services/api/project.service";

interface FilePreviewWidgetProps {
  file: ProjectFile;
  onDownload?: (file: ProjectFile) => void;
}

export const FilePreviewWidget = ({ file, onDownload }: FilePreviewWidgetProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFileIcon = () => {
    if (file.mimeType.includes("pdf")) {
      return <PdfIcon sx={{ fontSize: 40, color: "#f44336" }} />;
    }
    return <DocIcon sx={{ fontSize: 40, color: colors.primary.main }} />;
  };

  const getFileTypeLabel = () => {
    if (file.fileType === "proposal") return "Proposal";
    if (file.fileType === "whitepaper") return "White Paper";
    return "Document";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(file);
    }
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.background.white} 0%, ${colors.primary.lighter}20 100%)`,
          borderRadius: "12px",
          border: `1px solid ${colors.primary.lighter}`,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 4px 12px ${colors.primary.main}20`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            minWidth: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.background.lightGreen,
            borderRadius: "8px",
          }}
        >
          {getFileIcon()}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: colors.text.primary,
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getFileTypeLabel()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.text.muted,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {file.originalName}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.text.muted }}>
            {formatFileSize(file.fileSize)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          {file.mimeType.includes("pdf") && (
            <IconButton
              size="small"
              onClick={handlePreview}
              sx={{
                color: colors.primary.main,
                "&:hover": {
                  background: colors.primary.lighter,
                },
              }}
              title="Preview"
            >
              <ViewIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleDownload}
            sx={{
              color: colors.primary.main,
              "&:hover": {
                background: colors.primary.lighter,
              },
            }}
            title="Download"
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>

      {/* PDF Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            height: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
            borderBottom: `1px solid ${colors.primary.lighter}`,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {getFileTypeLabel()} Preview
            </Typography>
            <Typography variant="caption" sx={{ color: colors.text.muted }}>
              {file.originalName}
            </Typography>
          </Box>
          <IconButton onClick={() => setPreviewOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ color: colors.primary.main }} />
            </Box>
          )}
          {file.mimeType.includes("pdf") && (
            <iframe
              src={`${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}${file.filePath}`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                flex: 1,
              }}
              title={file.originalName}
              onLoad={() => setLoading(false)}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.primary.lighter}` }}>
          <Button
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
              background: colors.primary.main,
              color: colors.text.light,
              textTransform: "none",
              px: 3,
              borderRadius: "8px",
              "&:hover": {
                background: colors.primary.dark,
              },
            }}
          >
            Download
          </Button>
          <Button
            onClick={() => setPreviewOpen(false)}
            sx={{
              textTransform: "none",
              color: colors.text.secondary,
              px: 3,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
