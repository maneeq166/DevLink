import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLinks, deleteLink } from "../api/links";

export default function LinkList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchLinks() {
      setLinks(await getLinks());
    }
    fetchLinks();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h6">Your Links</Typography>
      <List>
        {links.map((link) => (
          <ListItem key={link.id} secondaryAction={
            <IconButton edge="end" onClick={() => deleteLink(link.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          }>
            <ListItemText primary={link.title} secondary={<a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
