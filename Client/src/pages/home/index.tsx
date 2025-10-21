import { Box } from "@mui/material";
import { GradientBackground, GlassAppBar } from "../../components";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
      <GlassAppBar title="Welcome to People Square" />
      <GradientBackground>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {/* Content will be added here later */}
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default HomePage;
