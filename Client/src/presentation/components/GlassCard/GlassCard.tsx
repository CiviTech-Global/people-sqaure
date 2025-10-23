import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassmorphismStyles, borderRadius, responsivePadding } from "../../themes";

interface GlassCardProps {
  children: React.ReactNode;
  maxWidth?: string | number;
  fullWidth?: boolean;
}

const StyledGlassCard = styled(Box)(({ theme }) => ({
  ...glassmorphismStyles.card,
  borderRadius: borderRadius.xlarge,
  padding: responsivePadding.card.md,
  boxSizing: "border-box",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: responsivePadding.card.sm,
    borderRadius: borderRadius.large,
  },
  [theme.breakpoints.down(400)]: {
    padding: responsivePadding.card.xs,
  },
}));

export const GlassCard = ({ children, maxWidth = "500px", fullWidth = false }: GlassCardProps) => {
  return (
    <StyledGlassCard
      sx={{
        maxWidth: fullWidth ? "100%" : maxWidth,
      }}
    >
      {children}
    </StyledGlassCard>
  );
};
