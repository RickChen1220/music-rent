import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { DateTime } from "luxon";

export default function BookingWidget({ place, selectedTime, selectedDate }) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const selectedTimeObj = DateTime.fromFormat(selectedTime, "hh:mm");
  const checkOutTimeObj = selectedTimeObj.plus({ hours: 1 });
  const formattedCheckOutTime = checkOutTimeObj.toFormat("HH:mm");
  useEffect(() => {
    setCheckOutTime(formattedCheckOutTime);
  }, [selectedTime]);

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      date: selectedDate,
      checkIn: selectedTimeObj,
      checkOut: checkOutTimeObj,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  /*   console.log("selectedDate :", selectedDate);
  console.log("checkOutTimeObj :", checkOutTimeObj);
  console.log("selectedTimeObj :", selectedTimeObj); */

  return (
    <div>
      <div className="rounded-2xl bg-white p-4 shadow">
        <div className="text-center text-2xl">
          Price: ${place.price} / per hour
        </div>
        <div className="rounded-2xl border border-gray-400">
          <div>
            {selectedDate && (
              <div className=" py-3 px-4">
                <p>Selected Date: {selectedDate}</p>
              </div>
            )}
          </div>
          <div className="border-t border-gray-400 py-3 px-4">
            {selectedTime ? (
              <p>
                Your are booking this room from {selectedTime} to {checkOutTime}
              </p>
            ) : (
              <p>Please select a time</p>
            )}
          </div>
          <div className=" border-t border-gray-400 py-3 px-4">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {selectedDate && selectedTime && (
            <div className=" border-t border-gray-400 py-3 px-4">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        {selectedTime && (
          <div className=" py-3 px-4">
            <p>Selected Time: {selectedTime}</p>
          </div>
        )}
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
        </button>
      </div>
    </div>
  );
}
