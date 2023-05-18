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
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const selectedTimeObj = DateTime.fromFormat(selectedTime, "hh:mm");
  const checkOutTimeObj = selectedTimeObj.plus({ hours: 1 });
  const checkOutTime = checkOutTimeObj.toFormat("HH:mm");

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

  console.log("selectedDate :", selectedDate);
  console.log("checkOutTimeObj :", checkOutTimeObj);
  console.log("selectedTimeObj :", selectedTimeObj);

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per hour
        </div>
        <div className="border border-gray-400 rounded-2xl">
          <div>
            {selectedDate && (
              <div className=" py-3 px-4">
                <p>Selected Date: {selectedDate}</p>
              </div>
            )}
          </div>
          <div className="py-3 px-4 border-t border-gray-400">
            {selectedTime ? (
              <p>
                Your are booking this room from {selectedTime} to {checkOutTime}
              </p>
            ) : (
              <p>Please select a time</p>
            )}
          </div>
          <div className=" py-3 px-4 border-t border-gray-400">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {selectedDate && selectedTime && (
            <div className=" py-3 px-4 border-t border-gray-400">
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
