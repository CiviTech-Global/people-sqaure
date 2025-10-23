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
  borderRadius: borderRadius.button,
  padding: responsivePadding.button.md,
  color: glassColors.textButton,
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  transition: transitions.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  boxSizing: "border-box",
  whiteSpace: "normal",
  textAlign: "center",
  lineHeight: 1.4,
  minHeight: "48px",
  "&:hover": {
    ...glassmorphismStyles.buttonHover,
    transform: "translateY(-2px)",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
    flexShrink: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: responsivePadding.button.sm,
    fontSize: "15px",
    gap: "10px",
    minHeight: "44px",
  },
  [theme.breakpoints.down(400)]: {
    padding: responsivePadding.button.xs,
    fontSize: "14px",
    gap: "8px",
    minHeight: "40px",
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
