import { glassColors, shadows } from "./colors";

export const glassmorphismStyles = {
  card: {
    background: glassColors.cardBackground,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${glassColors.cardBorder}`,
    boxShadow: shadows.glass,
  },
  button: {
    background: glassColors.buttonBackground,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: `1px solid ${glassColors.buttonBorder}`,
  },
  buttonHover: {
    background: glassColors.buttonBackgroundHover,
    boxShadow: shadows.glassHover,
  },
} as const;

export const borderRadius = {
  small: "12px",
  medium: "16px",
  large: "20px",
} as const;

export const transitions = {
  default: "all 0.3s ease",
  fast: "all 0.2s ease",
  slow: "all 0.4s ease",
} as const;
