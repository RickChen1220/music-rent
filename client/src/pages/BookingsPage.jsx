import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav user={user} />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              key={booking._id} // Assign a unique key prop
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-slate-200 rounded-2xl overflow-hidden border border-gray-300 my-4"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 grow pr-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                <BookingDates
                  booking={booking}
                  className="border-t border-gray-300 mt-4 py-2 text-gray-500"
                />
                <div className="text-xl font-semibold">
                  Total price: ${booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
