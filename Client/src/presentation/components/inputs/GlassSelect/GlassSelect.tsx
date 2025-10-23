import { MenuItem, Select } from "@mui/material";
import type { SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassmorphismStyles, borderRadius, glassColors, transitions } from "../../../themes";

type GlassSelectProps = Omit<SelectProps, "variant">;

const StyledGlassSelect = styled(Select)({
  ...glassmorphismStyles.input,
  borderRadius: borderRadius.medium,
  color: glassColors.textPrimary,
  fontSize: "15px",
  transition: transitions.default,
  "& .MuiSelect-select": {
    padding: "14px 16px",
    color: glassColors.textPrimary,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  "& .MuiSelect-icon": {
    color: glassColors.textSecondary,
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
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export const GlassSelect = (props: GlassSelectProps) => {
  return (
    <StyledGlassSelect
      {...props}
      MenuProps={{
        PaperProps: {
          sx: {
            ...glassmorphismStyles.card,
            borderRadius: borderRadius.medium,
            marginTop: "8px",
            maxHeight: "300px",
            "& .MuiMenuItem-root": {
              color: glassColors.textPrimary,
              fontSize: "15px",
              padding: "12px 16px",
              transition: transitions.default,
              "&:hover": {
                background: "rgba(110, 199, 126, 0.1)",
              },
              "&.Mui-selected": {
                background: "rgba(110, 199, 126, 0.15)",
                "&:hover": {
                  background: "rgba(110, 199, 126, 0.2)",
                },
              },
            },
          },
        },
      }}
    />
  );
};

export { MenuItem };
