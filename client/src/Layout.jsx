import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

export default function Layout() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#f7faf2", height: "h-screen" }}>
        <div className="min-h-screen">
          <Navbar />
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </Box>
    </Container>
  );
}
