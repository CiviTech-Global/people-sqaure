import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { gradients } from "../../themes";

interface GradientBackgroundProps {
  children: React.ReactNode;
  gradient?: string;
  minHeight?: string;
  fullHeight?: boolean;
}

const StyledGradientBackground = styled(Box)<{ gradient: string }>(({ gradient }) => ({
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  maxWidth: "100%",
  background: gradient,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  overflow: "hidden",
  position: "relative",
  boxSizing: "border-box",
}));

export const GradientBackground = ({
  children,
  gradient = gradients.primary,
  minHeight = "100vh",
  fullHeight = true,
}: GradientBackgroundProps) => {
  return (
    <StyledGradientBackground
      gradient={gradient}
      sx={{
        minHeight,
        height: fullHeight ? "100%" : "auto",
      }}
    >
      {children}
    </StyledGradientBackground>
  );
};
