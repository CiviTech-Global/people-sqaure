import { Alert, AlertProps, alpha } from "@mui/material";
import { colors } from "../themes";

export const StyledAlert = (props: AlertProps) => {
  const getSeverityStyles = () => {
    switch (props.severity) {
      case "success":
        return {
          backgroundColor: alpha(colors.primary.main, 0.1),
          borderLeft: `4px solid ${colors.primary.main}`,
          color: colors.text.primary,
          "& .MuiAlert-icon": {
            color: colors.primary.main,
          },
        };
      case "error":
        return {
          backgroundColor: alpha("#f44336", 0.1),
          borderLeft: "4px solid #f44336",
          color: colors.text.primary,
          "& .MuiAlert-icon": {
            color: "#f44336",
          },
        };
      case "warning":
        return {
          backgroundColor: alpha("#ff9800", 0.1),
          borderLeft: "4px solid #ff9800",
          color: colors.text.primary,
          "& .MuiAlert-icon": {
            color: "#ff9800",
          },
        };
      case "info":
        return {
          backgroundColor: alpha("#2196f3", 0.1),
          borderLeft: "4px solid #2196f3",
          color: colors.text.primary,
          "& .MuiAlert-icon": {
            color: "#2196f3",
          },
        };
      default:
        return {};
    }
  };

  return (
    <Alert
      {...props}
      sx={{
        borderRadius: "12px",
        ...getSeverityStyles(),
        ...props.sx,
      }}
    />
  );
};
