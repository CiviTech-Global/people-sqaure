import { glassColors, shadows } from "./colors";

export const glassmorphismStyles = {
  card: {
    background: glassColors.cardBackground,
    border: `1px solid ${glassColors.cardBorder}`,
    boxShadow: shadows.card,
  },
  button: {
    background: glassColors.buttonBackground,
    border: "none",
    boxShadow: shadows.button,
  },
  buttonHover: {
    background: glassColors.buttonBackgroundHover,
    boxShadow: shadows.buttonHover,
  },
  input: {
    background: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(110, 199, 126, 0.2)",
    boxShadow: shadows.input,
  },
  inputFocused: {
    border: "1px solid rgba(110, 199, 126, 0.5)",
    boxShadow: "0 4px 12px rgba(110, 199, 126, 0.2)",
  },
} as const;

export const borderRadius = {
  small: "8px",
  medium: "12px",
  large: "16px",
  xlarge: "24px",
  button: "50px",
} as const;

export const transitions = {
  default: "all 0.3s ease",
  fast: "all 0.2s ease",
  slow: "all 0.4s ease",
} as const;
