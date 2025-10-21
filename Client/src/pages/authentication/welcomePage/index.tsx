import { Box, Typography, Container } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { GradientBackground, GlassCard, GlassButton } from "../../../components";
import { glassColors, shadows, spacing, responsivePadding } from "../../../themes";

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
          padding: { xs: responsivePadding.container.xs, sm: responsivePadding.container.sm },
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <GlassCard maxWidth="500px">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: glassColors.textPrimary,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: spacing.md,
              textShadow: shadows.text,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: glassColors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.xxxl,
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: 1.5,
            }}
          >
            Please select your role to continue
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.md }}>
              <GlassButton
                icon={<RocketLaunchIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("startup-owner")}
              >
                Start-up Owner / Developer
              </GlassButton>
            </Box>

            <Box sx={{ marginBottom: spacing.md }}>
              <GlassButton
                icon={<AccountBalanceIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("investor")}
              >
                Investors, Sponsors, VCs, etc.
              </GlassButton>
            </Box>

            <Box>
              <GlassButton
                icon={<LightbulbIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("citizen")}
              >
                Citizen with a Challenge/Issue/Demand
              </GlassButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default WelcomePage;
