import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { format } from "date-fns";

export default function BookingsPage() {
  const [bookings, setBookings] = useState("");
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div className="flex gap-4 bg-slate-200 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div>
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")} to{" "}
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </div>
                <div>
                  Number of nights: {}
                  Total price: ${booking.price}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
