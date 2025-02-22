import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { addLink } from "../api/links";

export default function LinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLink({ title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h6">Add New Link</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="URL" variant="outlined" fullWidth value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button type="submit" variant="contained" color="success">Add Link</Button>
      </form>
    </Paper>
  );
}
