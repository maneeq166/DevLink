import { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    if (!username || !password) {
      alert("Please fill in both username and password fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res.data);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
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
          sx={{
            fontWeight: 700,
            marginBottom: "20px",
            fontFamily: "monospace",
          }}
        >
          Login
        </Typography>
        <form
          onSubmit={handleSubmit} // Now using form submission
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
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
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "2px",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              padding: "10px 20px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "white",
                color: "rgba(13, 71, 161, 1)",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => navigate("/register")}
          fullWidth
          variant="text"
          sx={{
            marginTop: 2,
            fontFamily: "monospace",
            fontWeight: 600,
            fontSize: "20px",
            letterSpacing: "0px",
            padding: "10px 20px",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "white",
              color: "rgba(13, 71, 161, 1)",
            },
          }}
        >
          Didn't have an account? Register
        </Button>
      </Paper>
    </div>
  );
}
