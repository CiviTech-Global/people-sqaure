import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { useAuth } from "../../../../context/AuthContext";
import { GlassCard } from "../../../components/GlassCard/GlassCard";
import { GlassTextField } from "../../../components/inputs/GlassTextField/GlassTextField";
import { GlassButton } from "../../../components/buttons/GlassButton/GlassButton";
import { UserService } from "../../../../services/api/user.service";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFullName, setEditedFullName] = useState(user?.fullName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedFullName(user?.fullName || "");
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFullName(user?.fullName || "");
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!editedFullName.trim()) {
      setError("Full name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await UserService.updateProfile(user.id, {
        fullName: editedFullName.trim(),
      });

      updateUser(response.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "startup-owner":
        return "#667eea";
      case "investor":
        return "#f093fb";
      case "organization":
        return "#764ba2";
      case "citizen":
        return "#48c6ef";
      default:
        return "#667eea";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "startup-owner":
        return "Startup Owner";
      case "investor":
        return "Investor";
      case "organization":
        return "Organization";
      case "citizen":
        return "Citizen";
      default:
        return role;
    }
  };

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          Loading profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ mb: 2, backgroundColor: "rgba(211, 47, 47, 0.2)", color: "#fff" }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess(null)}
          sx={{ mb: 2, backgroundColor: "rgba(46, 125, 50, 0.2)", color: "#fff" }}
        >
          {success}
        </Alert>
      )}
      <GlassCard fullWidth maxWidth="100%">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                background:
                  "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)",
                fontSize: "2.5rem",
                fontWeight: 700,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.4)",
              }}
            >
              {user.fullName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  mb: 1,
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {user.fullName}
              </Typography>
              <Chip
                label={getRoleLabel(user.role)}
                sx={{
                  backgroundColor: getRoleColor(user.role),
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.3)",
                }}
              />
            </Box>
          </Box>
          {!isEditing && (
            <IconButton
              onClick={handleEdit}
              sx={{
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>

        <Divider
          sx={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            mb: 4,
          }}
        />

        {/* Profile Information */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PersonIcon /> Personal Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon fontSize="small" /> Full Name
              </Typography>
              {isEditing ? (
                <GlassTextField
                  fullWidth
                  value={editedFullName}
                  onChange={(e) => setEditedFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              ) : (
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {user.fullName}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <EmailIcon fontSize="small" /> Email Address
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {user.email}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <BadgeIcon fontSize="small" /> Role
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {getRoleLabel(user.role)}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CalendarIcon fontSize="small" /> Member Since
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {formatDate(user.createdAt)}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CalendarIcon fontSize="small" /> Last Updated
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {formatDate(user.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Edit Actions */}
        {isEditing && (
          <>
            <Divider
              sx={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                my: 4,
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <GlassButton
                onClick={handleCancel}
                icon={<CancelIcon />}
                fullWidth={false}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                Cancel
              </GlassButton>
              <GlassButton
                onClick={handleSave}
                icon={loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <SaveIcon />}
                fullWidth={false}
                disabled={loading}
                sx={{
                  minWidth: 120,
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%)",
                  },
                }}
              >
                {loading ? "Saving..." : "Save"}
              </GlassButton>
            </Stack>
          </>
        )}
      </GlassCard>
    </Box>
  );
};

export default Profile;
