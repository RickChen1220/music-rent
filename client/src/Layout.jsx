import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-coustom-color">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
