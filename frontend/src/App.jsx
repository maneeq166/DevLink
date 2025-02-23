import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/Linklist";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-hidden">

      <Container maxWidth="xl" sx={{   minHeight: "100%",minWidth:"100%",
   }}>
      {/* <Navbar /> */}

        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-link" element={<LinkForm />} />
          <Route path="/links" element={<LinkList /> } />
        </Routes>
      </Container>
      </div>
    </Router>
  );
}
