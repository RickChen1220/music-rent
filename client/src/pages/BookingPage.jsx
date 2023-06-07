import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { DateTime } from "luxon";

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

  const checkInTime = DateTime.fromISO(booking.checkIn)
  const checkOutTime = DateTime.fromISO(booking.checkOut);
  const checkIn = checkInTime.toFormat("HH:mm");
  const checkOut = checkOutTime.toFormat("HH:mm");

  const duration = checkOutTime.diff(checkInTime, "hours");
  const hours = duration.hours;

  console.log("hours:", hours);

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your are booking this room for {hours} hours.</h2>
          <div className="mb-4 flex text-lg">
          <BookingDates booking={booking} checkIn={checkIn} checkOut={checkOut} />
          &nbsp;
          <span className="font-bold">{checkIn} to {checkOut}</span>
          </div>
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
