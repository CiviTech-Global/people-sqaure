import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  glassmorphismStyles,
  borderRadius,
  glassColors,
  transitions,
  responsivePadding,
} from "../../../themes";

interface GlassButtonProps extends Omit<ButtonProps, "variant"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const StyledGlassButton = styled(Button)(({ theme }) => ({
  ...glassmorphismStyles.button,
  borderRadius: borderRadius.small,
  padding: responsivePadding.button.md,
  color: glassColors.textPrimary,
  fontSize: "15px",
  fontWeight: 500,
  textTransform: "none",
  transition: transitions.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "12px",
  boxSizing: "border-box",
  whiteSpace: "normal",
  textAlign: "left",
  lineHeight: 1.4,
  "&:hover": {
    ...glassmorphismStyles.buttonHover,
    transform: "translateY(-2px)",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
    flexShrink: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: responsivePadding.button.sm,
    fontSize: "14px",
    gap: "10px",
  },
  [theme.breakpoints.down(400)]: {
    padding: responsivePadding.button.xs,
    fontSize: "13px",
    gap: "8px",
  },
}));

export const GlassButton = ({
  children,
  icon,
  fullWidth = true,
  ...props
}: GlassButtonProps) => {
  return (
    <StyledGlassButton
      startIcon={icon}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledGlassButton>
  );
};
