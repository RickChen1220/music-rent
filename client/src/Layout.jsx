import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="container mx-auto py-4 px-8 flex flex-col min-h-screen bg-coustom-color">
      <Header />
      <Outlet />
      <div className="bg-white">
        <div className="p-6">
          <h2>Plan your practice now</h2>
          <h1>Save big and learn well with our music room</h1>
          <p>
            Choose your favorie room near you with best facilities and
            Unbeatable price.
          </p>
          <img src="/images/gp-1.jpg" alt="My Image" />
        </div>
      </div>
    </div>
  );
}
