import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { GradientBackground, GlassCard, GlassButton } from "../../../components";
import { glassColors, spacing, responsivePadding } from "../../../themes";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleUserTypeClick = (userType: string) => {
    console.log(`Selected user type: ${userType}`);
    // Navigate to login after selecting user type
    navigate("/login");
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
        <GlassCard maxWidth="550px">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: glassColors.textPrimary,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: spacing.xs,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            WELCOME
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: glassColors.textPrimary,
              textAlign: "center",
              fontWeight: 600,
              marginBottom: spacing.sm,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            To People Square
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: glassColors.textSecondary,
              textAlign: "center",
              marginBottom: spacing.xl,
              fontSize: { xs: "13px", sm: "14px", md: "15px" },
              lineHeight: 1.6,
              px: { xs: 1, sm: 2 },
            }}
          >
            People Square is a platform that connects people, homes, organizations and communities to create positive impact together. Join us in building a better future.
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ marginBottom: spacing.md }}>
              <GlassButton
                icon={<RocketLaunchIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("startup-owner")}
              >
                Startup Owners/Developers
              </GlassButton>
            </Box>

            <Box sx={{ marginBottom: spacing.md }}>
              <GlassButton
                icon={<AccountBalanceIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("investor")}
              >
                Investors, Sponsors, Venture Capitalists, etc.
              </GlassButton>
            </Box>

            <Box sx={{ marginBottom: spacing.md }}>
              <GlassButton
                icon={<BusinessIcon sx={{ fontSize: { xs: "24px", sm: "28px" } }} />}
                onClick={() => handleUserTypeClick("organization")}
              >
                Organizations and Enterprises
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
