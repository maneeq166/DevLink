import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import { getUser } from "./api/auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
    }
    fetchUser();
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={<Auth setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/add-link" element={user ? <LinkForm /> : <Navigate to="/login" />} />
          <Route path="/links" element={user ? <LinkList /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}
