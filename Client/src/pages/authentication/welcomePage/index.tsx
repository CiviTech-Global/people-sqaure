import { Box, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  maxWidth: "100%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  overflow: "hidden",
  position: "relative",
  boxSizing: "border-box",
});

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "48px 32px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  maxWidth: "500px",
  width: "100%",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "32px 24px",
    borderRadius: "16px",
  },
  [theme.breakpoints.down(400)]: {
    padding: "24px 16px",
  },
}));

const UserTypeButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "18px 20px",
  marginBottom: "16px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "12px",
  boxSizing: "border-box",
  whiteSpace: "normal",
  textAlign: "left",
  lineHeight: 1.4,
  "&:hover": {
    background: "rgba(255, 255, 255, 0.25)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.4)",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
    flexShrink: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "16px 16px",
    fontSize: "14px",
    gap: "10px",
  },
  [theme.breakpoints.down(400)]: {
    padding: "14px 12px",
    fontSize: "13px",
    gap: "8px",
  },
}));

const WelcomePage = () => {
  const handleUserTypeClick = (userType: string) => {
    console.log(`Selected user type: ${userType}`);
    // Navigation logic will be implemented later
  };

  return (
    <GradientBackground>
      <Container
        maxWidth="sm"
        sx={{
          padding: { xs: "16px", sm: "20px" },
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <GlassCard>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "12px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              marginBottom: "32px",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: 1.5,
            }}
          >
            Please select your role to continue
          </Typography>

          <Box sx={{ width: "100%" }}>
            <UserTypeButton
              startIcon={<RocketLaunchIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
              onClick={() => handleUserTypeClick("startup-owner")}
            >
              Start-up Owner / Developer
            </UserTypeButton>

            <UserTypeButton
              startIcon={<AccountBalanceIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
              onClick={() => handleUserTypeClick("investor")}
            >
              Investors, Sponsors, VCs, etc.
            </UserTypeButton>

            <UserTypeButton
              startIcon={<LightbulbIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
              onClick={() => handleUserTypeClick("citizen")}
              sx={{ marginBottom: 0 }}
            >
              Citizen with a Challenge/Issue/Demand
            </UserTypeButton>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default WelcomePage;
