import { useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/Linklist";
import AuthNavbar from "../components/AuthNavbar";

export default function Dashboard() {
  const fullText = "Welcome, username"; // Full text to be typed
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100); // Adjust speed by changing this delay (100ms)
      return () => clearTimeout(timeout);
    }
  }, [index]);

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
