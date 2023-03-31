import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
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
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        My account
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        My bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        My rooms
      </Link>
    </nav>
  );
}
