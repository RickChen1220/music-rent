import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  console.log(subpage);
  if (!ready) {
    return "Lodaing...";
  }
  console.log(user);

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav user={user} />
      {subpage === "profile" && (
        <div className="mx-auto max-w-lg text-center">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary mt-2 max-w-sm">
            Log out
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
