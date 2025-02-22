import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null); // Clear user state
    // Remove token from localStorage if using authentication tokens
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        marginTop: 2,
        width: "100%",
        backgroundColor: "rgba(13, 71, 161, 0.8)", // Slight transparency
        boxShadow: 4,
        paddingY: 0,
        borderRadius: 3,
        transition: "background-color 0.3s ease, border 0.3s ease",
        border: "1px solid rgba(0, 0, 0, 0.4)", // Thin darker border
        "&:hover": {
          backgroundColor: "rgba(13, 71, 161, 1)", // Full color on hover
          border: "1px solid rgba(0, 0, 0, 0.6)" // Darker border on hover
        }
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand Name */}
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: "none", 
            color: "white", 
            fontWeight: "bold",
            fontFamily: "monospace"
          }}
        >
          DevLink
        </Typography>

        {/* Navigation Links */}
        <Box>
          {user ? (
            <>
              <Button component={Link} to="/dashboard" sx={navButtonStyle}>
                Dashboard
              </Button>
              <Button component={Link} to="/add-link" sx={navButtonStyle}>
                Add Link
              </Button>
              <Button component={Link} to="/links" sx={navButtonStyle}>
                My Links
              </Button>
              <Button 
                onClick={handleLogout} 
                sx={{ 
                  ...navButtonStyle, 
                  backgroundColor: "#D32F2F", 
                  "&:hover": { backgroundColor: "#B71C1C" }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={navButtonStyle}>
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                sx={{ 
                  ...navButtonStyle, 
                  backgroundColor: "rgb(0, 0, 100,0.6)", // Green color for register
                  "&:hover": { backgroundColor: "rgb(0, 0, 90)" } 
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// 🔹 Reusable Button Style Object
const navButtonStyle = {
  color: "white",
  fontSize: "15px",
  fontWeight: "600",
  marginLeft: "10px",
  textTransform: "none",
  borderRadius: "5px",
  padding: "6px 12px",
  transition: "background-color 0.3s ease",
  "&:hover": { backgroundColor: "rgb(0, 0, 96,0.2)" }
};
