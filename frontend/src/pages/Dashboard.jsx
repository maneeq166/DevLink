import { Typography, Container } from "@mui/material";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/Linklist";
import AuthNavbar from "../components/AuthNavbar";

export default function Dashboard() {
  return (
    <div>
    <AuthNavbar />
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4">Welcome,!</Typography>
      <LinkForm />
      <LinkList />
    </Container>
    </div>
  );
}
