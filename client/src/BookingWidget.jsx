import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { DateTime } from "luxon";

export default function BookingWidget({
  place,
  selectedTime,
  selectedDate,
  checkoutTime,
}) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(UserContext);

  const selectedTimeObj = DateTime.fromFormat(selectedTime, "hh:mm");
  const checkoutTimeObj = DateTime.fromFormat(checkoutTime, "hh:mm");
  const selectedDateObj = new Date(selectedDate);
  const formattedSelectedDate = selectedDateObj.toLocaleDateString();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    // Calculate the totalPrice whenever the relevant inputs change
    const duration = checkoutTimeObj.diff(selectedTimeObj, "hours");
    const hours = duration.hours;
    const totalPrice = hours * place.price;

    setTotalPrice(totalPrice);
  }, [selectedTimeObj, checkoutTimeObj, place.price]);

  const formattedSelectedTime = selectedTimeObj.toFormat("HH:mm");
  const formattedCheckoutTime = checkoutTimeObj.toFormat("HH:mm");

  console.log("selectedDate", selectedDateObj);
 /*  console.log("formattedSelectedTime", formattedSelectedTime);
  console.log("formattedCheckoutTime", formattedCheckoutTime); */

  async function bookThisPlace() {
  
    const response = await axios.post("/bookings", {
      date: selectedDateObj,
      checkIn: formattedSelectedTime,
      checkOut: formattedCheckoutTime,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: totalPrice,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

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
                <p>Selected Date: {formattedSelectedDate}</p>
              </div>
            )}
          </div>
          <div className="border-t border-gray-400 py-3 px-4">
            {selectedTime ? (
              <p>
                Your are booking this room from {selectedTime} to {checkoutTime}
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