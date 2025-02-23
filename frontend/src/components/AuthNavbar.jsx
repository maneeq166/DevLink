import { Link , useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function AuthNavbar({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
              navigate("/");
    
    // Clear user state
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        marginTop: 2,
        width: "100%",
        backgroundColor: "rgba(13, 71, 161, 0.8)",
        boxShadow: 4,
        paddingY: 0,
        borderRadius: 3,
        transition: "background-color 0.3s ease, border 0.3s ease",
        border: "1px solid rgba(0, 0, 0, 0.4)",
        "&:hover": {
          backgroundColor: "rgba(13, 71, 161, 1)",
          border: "1px solid rgba(0, 0, 0, 0.6)"
        }
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

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
