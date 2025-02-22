import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import LinkForm from "./components/LinkForm";
// import LinkList from "./components/LinkList";
// import { getUser } from "./api/auth";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="min-h-screen w-full overflow-hidden">

      <Container maxWidth="xl" sx={{   minHeight: "100%",minWidth:"100%",
   }}>
      <Navbar />

        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          {/* <Route path="/add-link" element={user ? <LinkForm /> : <Navigate to="/login" />} />
          <Route path="/links" element={user ? <LinkList /> : <Navigate to="/login" />} /> */}
        </Routes>
      </Container>
      </div>
    </Router>
  );
}
