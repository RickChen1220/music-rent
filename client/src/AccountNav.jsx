import { Link, useLocation } from "react-router-dom";

export default function AccountNav({ user }) {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6 rounded-xl";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-slate-300";
    }
    return classes;
  }
  return (
    <nav className="mt-8 mb-8 flex w-full justify-center gap-2">
      <Link className={linkClasses("profile")} to={"/account"}>
        My account
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        My bookings
      </Link>
      {user?.isAdmin && ( // Only render the link if the user is an admin
        <Link className={linkClasses("places")} to={"/account/places"}>
          My rooms
        </Link>
      )}
    </nav>
  );
}
