import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassmorphismStyles, borderRadius, glassColors, transitions } from "../../../themes";

type GlassTextFieldProps = Omit<TextFieldProps, "variant">;

const StyledGlassTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ...glassmorphismStyles.button,
    borderRadius: borderRadius.small,
    color: glassColors.textPrimary,
    fontSize: "15px",
    transition: transitions.default,
    "& input": {
      padding: "14px 16px",
      color: glassColors.textPrimary,
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.6)",
        opacity: 1,
      },
    },
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    },
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "15px",
    "&.Mui-focused": {
      color: glassColors.textPrimary,
    },
  },
  "& .MuiFormHelperText-root": {
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: "4px",
  },
});

export const GlassTextField = (props: GlassTextFieldProps) => {
  return <StyledGlassTextField {...props} />;
};
