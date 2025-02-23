import { useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/Linklist";
import AuthNavbar from "../components/AuthNavbar";

export default function Dashboard() {
  const [username, setUsername] = useState(""); // State for username
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Fetch username from localStorage or default to "Guest"
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const fullText = `Welcome, ${username || "Guest"}`; // Dynamic welcome text

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fcff",
      }}
    >
      <AuthNavbar />
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 600,
          marginTop: "30px",
          fontFamily: "monospace",
        }}
      >
        {typedText} {/* Typing Effect */}
        <span style={{ color: "black" }}>|</span> {/* Blinking Cursor */}
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
    </Box>
  );
}
