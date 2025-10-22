import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { glassColors } from "../../../themes";

interface GlassAppBarProps {
  title?: string;
  children?: React.ReactNode;
}

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(240, 147, 251, 0.9) 100%)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.4), 0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
  position: "sticky",
  top: 0,
  zIndex: 1100,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, rgba(102, 126, 234, 0.5), rgba(240, 147, 251, 0.5), rgba(102, 126, 234, 0.5))",
    filter: "blur(1px)",
  },
});

const FuturisticToolbar = styled(Toolbar)({
  minHeight: "72px",
  position: "relative",
  paddingLeft: "24px",
  paddingRight: "24px",
  "@media (max-width: 600px)": {
    minHeight: "64px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
});

const TitleWrapper = styled(Box)({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "4px",
    height: "24px",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))",
    borderRadius: "2px",
    boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)",
  },
});

export const GlassAppBar = ({ title, children }: GlassAppBarProps) => {
  return (
    <StyledAppBar elevation={0}>
      <FuturisticToolbar>
        {title && (
          <TitleWrapper sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: glassColors.textPrimary,
                fontWeight: 700,
                fontSize: { xs: "1.15rem", sm: "1.35rem", md: "1.5rem" },
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.3)",
                letterSpacing: "0.5px",
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "60px",
                  height: "2px",
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent)",
                  borderRadius: "2px",
                },
              }}
            >
              {title}
            </Typography>
          </TitleWrapper>
        )}
        {children && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            {children}
          </Box>
        )}
      </FuturisticToolbar>
    </StyledAppBar>
  );
};
