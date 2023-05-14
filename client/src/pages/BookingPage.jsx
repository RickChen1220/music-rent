import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState("");
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  const checkInTime = new Date(booking.checkIn);
  const checkOutTime = new Date(booking.checkOut);
  const checkIn = checkInTime.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const checkOut = checkOutTime.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:
          {checkIn} to {checkOut}</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
