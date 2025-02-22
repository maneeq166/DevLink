import { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { loginUser, registerUser } from "../api/auth";

export default function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = isRegister ? await registerUser(email, password) : await loginUser(email, password);
    if (user) setUser(user);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <Typography variant="h5">{isRegister ? "Register" : "Login"}</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button  type="submit" variant="contained" color="primary">{isRegister ? "Register" : "Login"}</Button>
      </form>
      <Button onClick={() => setIsRegister(!isRegister)} sx={{ marginTop: 2 }}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </Button>
    </Paper>
  );
}
