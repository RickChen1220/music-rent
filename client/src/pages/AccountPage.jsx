import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);
  const { subpage } = useParams();
  console.log(subpage);
  if (!ready) {
    return "Lodaing...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-xl";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={linkClasses("profile")} to={"/account"}>
          My account
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>My bookings</Link>
        <Link className={linkClasses("places")} to={"/account/places"}>My room</Link>
      </nav>
    </div>
  );
}
