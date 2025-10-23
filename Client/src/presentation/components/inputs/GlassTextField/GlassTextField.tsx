import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassmorphismStyles, borderRadius, glassColors, transitions } from "../../../themes";

type GlassTextFieldProps = Omit<TextFieldProps, "variant">;

const StyledGlassTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    ...glassmorphismStyles.input,
    borderRadius: borderRadius.medium,
    color: glassColors.textPrimary,
    fontSize: "15px",
    transition: transitions.default,
    "& input": {
      padding: "14px 16px",
      color: glassColors.textPrimary,
      "&::placeholder": {
        color: glassColors.textSecondary,
        opacity: 0.7,
      },
    },
    "&:hover": {
      borderColor: "rgba(110, 199, 126, 0.3)",
    },
    "&.Mui-focused": {
      ...glassmorphismStyles.inputFocused,
    },
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": {
    color: glassColors.textSecondary,
    fontSize: "15px",
    "&.Mui-focused": {
      color: glassColors.textPrimary,
    },
  },
  "& .MuiFormHelperText-root": {
    color: glassColors.textSecondary,
    marginLeft: "4px",
  },
});

export const GlassTextField = (props: GlassTextFieldProps) => {
  return <StyledGlassTextField {...props} />;
};
