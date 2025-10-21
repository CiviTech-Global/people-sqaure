import { MenuItem, Select } from "@mui/material";
import type { SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassmorphismStyles, borderRadius, glassColors, transitions } from "../../../themes";

type GlassSelectProps = Omit<SelectProps, "variant">;

const StyledGlassSelect = styled(Select)({
  ...glassmorphismStyles.button,
  borderRadius: borderRadius.small,
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
    color: "rgba(255, 255, 255, 0.8)",
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
            borderRadius: borderRadius.small,
            marginTop: "8px",
            maxHeight: "300px",
            "& .MuiMenuItem-root": {
              color: glassColors.textPrimary,
              fontSize: "15px",
              padding: "12px 16px",
              transition: transitions.default,
              "&:hover": {
                background: "rgba(255, 255, 255, 0.15)",
              },
              "&.Mui-selected": {
                background: "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
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
