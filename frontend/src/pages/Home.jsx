import { Link } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ textAlign: "center", marginTop: 5 }}>
      <Typography variant="h3">Welcome to DevLink</Typography>
      <Typography variant="body1" sx={{ marginY: 2 }}>Save and manage your links easily!</Typography>
      <Box sx={{ marginTop: 3 }}>
        <Button component={Link} to="/login" variant="contained" color="primary">Get Started</Button>
      </Box>
    </Container>
  );
}
