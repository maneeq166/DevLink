import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { addLink } from "../api/links";

export default function LinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !url.trim()) {
      setError("Title and URL are required.");
      return;
    }

    try {
      await addLink({ title, url });
      setTitle("");
      setUrl("");
      setError(""); // Clear error on success
    } catch (err) {
      setError("Failed to add link. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: 600,
          fontSize: "25px",
        }}
      >
        Add New Link
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginTop: "15px",
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            fontFamily: "monospace",
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              fontFamily: "monospace",
            },
          }}
        />

        <TextField
          label="URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            fontFamily: "monospace",
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              fontFamily: "monospace",
            },
          }}
        />

        {error && (
          <Typography color="error" sx={{ fontFamily: "monospace" }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#0D47A1",
            fontWeight: "bold",
            fontSize: "16px",
            fontFamily: "monospace",
            paddingX: 3,
            paddingY: 0.5,
            textTransform: "none",
            borderRadius: 1,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#08306b",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Add Link
        </Button>
      </form>
    </Paper>
  );
}
