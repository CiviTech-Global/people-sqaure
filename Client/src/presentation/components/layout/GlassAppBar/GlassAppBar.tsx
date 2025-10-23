import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colors } from "../../../themes";

interface GlassAppBarProps {
  title?: string;
  children?: React.ReactNode;
}

const StyledAppBar = styled(AppBar)({
  background: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 2px 20px rgba(110, 199, 126, 0.15)",
  borderBottom: "1px solid rgba(110, 199, 126, 0.15)",
  position: "sticky",
  top: 0,
  zIndex: 1100,
});

const StyledToolbar = styled(Toolbar)({
  minHeight: "68px",
  position: "relative",
  paddingLeft: "24px",
  paddingRight: "24px",
  "@media (max-width: 600px)": {
    minHeight: "60px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
});

export const GlassAppBar = ({ title, children }: GlassAppBarProps) => {
  return (
    <StyledAppBar elevation={0}>
      <StyledToolbar>
        {title && (
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: colors.text.primary,
                fontWeight: 700,
                fontSize: { xs: "1.15rem", sm: "1.35rem", md: "1.5rem" },
                letterSpacing: "0.3px",
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            ml: "auto",
          }}
        >
          {children}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};
