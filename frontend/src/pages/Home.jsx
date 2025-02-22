import { Link } from "react-router-dom";
import { Button, Typography, Container, Box, Paper } from "@mui/material";

export default function Home() {
  return (
    <div className="">

    <Box 
      sx={{
        margin:"-40px",
        minHeight: "100vh", // Fills the entire screen
        backgroundColor: "", // Light blue background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow:"hidden"
      }}
      >
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{
            padding: 5,
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#E3F2FD",
          }}
          >
          <Typography 
            variant="h2" 
            fontFamily={"monospace"} 
            sx={{ color: "#0D47A1", fontWeight: "bold" }}
            >
            Welcome to DevLink
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ marginY: 2, color: "#333", fontWeight: "600" }}
            >
            Save and manage your links easily!
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Button 
              component={Link} 
              to="/login" 
              variant="contained" 
              sx={{
                backgroundColor: "#0D47A1", 
                fontWeight: "bold",
                fontSize: "16px",
                paddingX: 4,
                paddingY: 1.5,
                textTransform: "none",
                borderRadius: 3,
                transition: "all 0.3s ease-in-out",
                "&:hover": { 
                  backgroundColor: "#08306b", 
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" 
                } // Adds a glowing hover effect
              }}
              >
              🚀 Get Started
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
              </div>
  );
}
