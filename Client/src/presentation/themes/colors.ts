export const gradients = {
  primary: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
  secondary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  tertiary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
} as const;

export const glassColors = {
  cardBackground: "rgba(255, 255, 255, 0.1)",
  cardBorder: "rgba(255, 255, 255, 0.18)",
  buttonBackground: "rgba(255, 255, 255, 0.15)",
  buttonBackgroundHover: "rgba(255, 255, 255, 0.25)",
  buttonBorder: "rgba(255, 255, 255, 0.2)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.9)",
} as const;

export const shadows = {
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  glassHover: "0 4px 16px 0 rgba(31, 38, 135, 0.4)",
  text: "2px 2px 4px rgba(0, 0, 0, 0.2)",
} as const;
