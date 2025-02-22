import { Typography, Container } from "@mui/material";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";

export default function Dashboard({ user }) {
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4">Welcome, {user.email}!</Typography>
      <LinkForm />
      <LinkList />
    </Container>
  );
}
