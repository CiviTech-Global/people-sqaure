export const gradients = {
  primary: "linear-gradient(135deg, #F4E869 0%, #B8D96A 25%, #6EC77E 50%, #48B894 75%, #3AA693 100%)",
  secondary: "linear-gradient(135deg, #E8F5C8 0%, #A8D99C 50%, #6EC77E 100%)",
  tertiary: "linear-gradient(135deg, #2D5F4F 0%, #1E453A 100%)",
  yellowGreen: "linear-gradient(to right, #F4E869 0%, #6EC77E 100%)",
  lightGreen: "linear-gradient(135deg, #E8F5C8 0%, #C4E4B8 100%)",
  darkGreen: "linear-gradient(135deg, #34685A 0%, #2A5148 100%)",
} as const;

export const colors = {
  primary: {
    main: "#6EC77E",
    light: "#A8D99C",
    dark: "#2D5F4F",
    lighter: "#E8F5C8",
  },
  accent: {
    yellow: "#F4E869",
    green: "#6EC77E",
    darkGreen: "#2D5F4F",
  },
  text: {
    primary: "#1E453A",
    secondary: "#5A7266",
    light: "#ffffff",
    muted: "#8FA599",
  },
  background: {
    white: "#ffffff",
    lightGreen: "#F5FAF3",
    card: "#ffffff",
  },
} as const;

export const glassColors = {
  cardBackground: "rgba(255, 255, 255, 0.95)",
  cardBorder: "rgba(110, 199, 126, 0.2)",
  buttonBackground: "linear-gradient(to right, #B8D96A 0%, #6EC77E 100%)",
  buttonBackgroundHover: "linear-gradient(to right, #A8D99C 0%, #5FB870 100%)",
  buttonBorder: "rgba(110, 199, 126, 0.3)",
  textPrimary: "#1E453A",
  textSecondary: "#5A7266",
  textButton: "#ffffff",
} as const;

export const shadows = {
  card: "0 10px 40px rgba(110, 199, 126, 0.15)",
  button: "0 4px 15px rgba(110, 199, 126, 0.3)",
  buttonHover: "0 6px 20px rgba(110, 199, 126, 0.4)",
  text: "none",
  input: "0 2px 8px rgba(110, 199, 126, 0.1)",
} as const;
