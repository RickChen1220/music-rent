import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkIn),
      new Date(checkOut)
    );
  }
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border border-gray-400 rounded-2xl">
          <div className="flex">
            <div className=" py-3 px-4">
              <label>From:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-l border-gray-400">
              <label>To:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className=" py-3 px-4 border-t border-gray-400">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary mt-4">
          Book this place
          {numberOfDays > 0 && <span> ${numberOfDays * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
