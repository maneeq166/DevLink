import { Typography, Container, Box } from "@mui/material";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/Linklist";
import AuthNavbar from "../components/AuthNavbar";

export default function Dashboard() {
  return (
    <div>
      <AuthNavbar />
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600,marginTop:"30px",fontFamily:"monospace" }}>
        Welcome, username
      </Typography>
      <Container sx={{ marginTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1.2, minWidth: 400 }}>
            <LinkForm />
          </Box>
          <Box sx={{ flex: 2, minWidth: 600 }}>
            <LinkList />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
