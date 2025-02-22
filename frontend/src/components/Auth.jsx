import { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { loginUser, registerUser } from "../api/auth";

export default function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = isRegister
      ? await registerUser(email, password)
      : await loginUser(email, password);
    if (user) setUser(user);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        marginY: 15,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, marginBottom: "20px", fontFamily: "monospace" }}
      >
        {isRegister ? "Register" : "Login"}
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: "18px",letterSpacing:'2px',boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",padding: "10px 20px",
       transition: "all 0.3s ease-in-out","&:hover": {
          backgroundColor: "white", // Full color on hover
          color:"rgba(13, 71, 161, 1)" // Darker border on hover
        } }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </form>
      <Button onClick={() => setIsRegister(!isRegister)} fullWidth variant="text" sx={{ marginTop: 2,fontFamily: "monospace", fontWeight: 600, fontSize: "20px",letterSpacing:'0px',
       padding: "10px 20px",
       transition: "all 0.3s ease-in-out",
       boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
       "&:hover": {
          backgroundColor: "white", // Full color on hover
          color:"rgba(13, 71, 161, 1)" // Darker border on hover
          
          
        } }}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </Button>
    </Paper>
  );
}
