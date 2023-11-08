import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

export default function TimePicker({
  onTimeSelect,
  selectedDate,
  onCheckoutTimeChange,
}) {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [clickedSlots, setClickedSlots] = useState({});
  const [clickedCheckoutSlots, setClickedCheckoutSlots] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const now = DateTime.now();
  const isToday = selectedDate.toDateString() === now.toJSDate().toDateString();

  // Calculate the minimum time for time slot generation based on the selected time
  let minimumTime = DateTime.fromJSDate(selectedDate).set({
    hour: place.openTime,
    minute: 0,
  });
  // If it's today and a selected time exists, set the minimum time to be after the selected time
  if (isToday && selectedTime) {
    minimumTime = DateTime.fromFormat(selectedTime, "HH:mm");
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  // Fetch the bookings for the selected place and date
  useEffect(() => {
    if (id && selectedDate) {
      axios
        .get(`/bookings/`, { params: { date: selectedDate } })
        .then((res) => {
          setBookings(res.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [id, selectedDate]);

  useEffect(() => {
    console.log("selectedCheckOutTime:", checkoutTime);
  }, [checkoutTime]);

  if (!place) return "";

  // Filter the time slots to include only the slots after the minimum time
  const timeSlots = [];
  let timeSlotsFiltered = timeSlots.filter(
    (timeSlot) => timeSlot.timeSlotObj >= minimumTime
  );
  let startTime = DateTime.fromJSDate(selectedDate);
  startTime = startTime.set({
    hour: place.openTime,
    minute: 0,
  });

  let bookingEndTime = DateTime.fromJSDate(selectedDate);
  bookingEndTime = bookingEndTime.set({
    hour: place.closeTime,
    minute: 0,
  });

  //Subtract one hour from closing time to allow for the last booking to end at the closing time
  bookingEndTime = bookingEndTime.minus({ minutes: 30 });

  // Calculate the checkout start time (one hour after the selected time)
  let checkoutStartTime = null;

  if (selectedTime) {
    const [selectedHour, selectedMinute] = selectedTime.split(":");
    checkoutStartTime = DateTime.fromJSDate(selectedDate)
      .set({
        hour: selectedHour,
        minute: selectedMinute,
      })
      .plus({ hours: 1 });
  } else {
    checkoutStartTime = DateTime.fromJSDate(selectedDate).set({
      hour: place.openTime,
      minute: 0,
    });
  }

  // Filter the time slots for the checkout time range
  const checkoutEndTime = DateTime.fromJSDate(selectedDate).set({
    hour: place.closeTime,
    minute: 0,
  });

  const checkoutTimeSlots = [];

  let checkoutTimeSlotsFiltered = checkoutTimeSlots.filter(
    (timeSlot) => timeSlot.timeSlotObj >= checkoutStartTime
  );

  while (checkoutStartTime <= checkoutEndTime) {
    const timeSlotObj = checkoutStartTime;
    const timeSlotTime = timeSlotObj.toFormat("HH:mm");

    // Check if the time slot is already booked

    const isBooked = bookings.some(
      (booking) =>
        timeSlotObj >= DateTime.fromFormat(booking.checkIn, "HH:mm") &&
        timeSlotObj <= DateTime.fromFormat(booking.checkOut, "HH:mm") &&
        booking.date === selectedDate.toDateString()
    );

    // Check if the time slot is within the check-in and check-out range
    const isInCheckInOutRange = bookings.some(
      (booking) =>
        timeSlotObj >= DateTime.fromFormat(booking.checkIn, "HH:mm") &&
        timeSlotObj <= DateTime.fromFormat(booking.checkOut, "HH:mm") &&
        booking.date === selectedDate.toDateString()
    );

    checkoutTimeSlotsFiltered.push({
      timeSlotObj,
      timeSlotTime,
      isBooked,
      disabled: isInCheckInOutRange,
    });

    checkoutStartTime = checkoutStartTime.plus({ minutes: 30 });
  }

  if (isToday) {
    // If the selected date is today, set the start time to the current time or the opening time of the place
    const currentHour = now.hour;
    const currentMinute = now.minute;
    if (currentHour < place.openTime) {
      startTime = startTime.set({ hour: place.openTime, minute: 0 });
    } else if (currentHour >= place.closeTime) {
      return "";
    } else {
      if (currentMinute < 30) {
        // Round up to the nearest 30-minute interval
        startTime = startTime.set({ hour: currentHour, minute: 30 });
      } else {
        startTime = startTime.set({ hour: currentHour + 1, minute: 0 });
      }
    }
    // If the current time is after the closing time of the place, don't show any time slots
    if (startTime >= bookingEndTime) {
      return null;
    }
  }

  while (startTime < bookingEndTime) {
    // If the selected date is today, skip time slots that are before the current time
    const timeSlot = new Date(startTime);
    if (isToday && timeSlot <= now.toJSDate()) {
      startTime = startTime.plus({ minutes: 30 });
      continue;
    }
    const timeSlotObj = DateTime.fromJSDate(timeSlot);
    const timeSlotLabel = timeSlotObj.toFormat("EEEE, LLLL d");
    const timeSlotTime = timeSlotObj.toFormat("HH:mm");

    // Check if the time slot is already booked

    const isBooked = bookings.some(
      (booking) =>
        timeSlotObj >= DateTime.fromFormat(booking.checkIn, "HH:mm") &&
        timeSlotObj <= DateTime.fromFormat(booking.checkOut, "HH:mm") &&
        booking.date === selectedDate.toDateString()
    );

    // Check if the time slot is within the check-in and check-out range
    const isInCheckInOutRange = bookings.some(
      (booking) =>
        timeSlotObj >= DateTime.fromFormat(booking.checkIn, "HH:mm") &&
        timeSlotObj <= DateTime.fromFormat(booking.checkOut, "HH:mm") &&
        booking.date === selectedDate.toDateString()
    );

    timeSlotsFiltered.push({
      timeSlotObj,
      timeSlotLabel,
      timeSlotTime,
      isBooked,
      disabled: isInCheckInOutRange,
    });

    startTime = startTime.plus({ minutes: 30 });
  }
  // Create a label for the time range
  const label = `Opening time: from ${place.openTime} to ${place.closeTime}`;

  function handleTimeChange(selectedTime) {
    const isSelected = clickedSlots[selectedTime];
    const updatedClickedSlots = {
      [selectedTime]: !isSelected,
    };
    setSelectedTime(isSelected ? "" : selectedTime);
    onTimeSelect(isSelected ? "" : selectedTime);
    setCheckoutTime(""); // Reset the checkout time
    onCheckoutTimeChange(""); // Reset the checkout time
    setClickedSlots(updatedClickedSlots);
    setClickedCheckoutSlots({}); // Reset the checkout time
    console.log("selectedTime:", isSelected ? "Now is empty" : selectedTime);
  }

  function handleCheckoutTimeChange(selectedTime) {
    setCheckoutTime(selectedTime);
    onCheckoutTimeChange(selectedTime);
    const isSelected = clickedCheckoutSlots[selectedTime];
    const updatedClickedCheckoutSlots = {
      [selectedTime]: !isSelected,
    };
    setClickedCheckoutSlots(updatedClickedCheckoutSlots);
  }

  return (
    <div>
      <div className="rounded-2xl p-2 shadow">
        <div id="time-range-label" className="mb-2 text-center font-medium">
          {label}
        </div>
        <div
          aria-labelledby="time-range-label"
          className="flex flex-wrap justify-center"
        >
          {timeSlotsFiltered.map((timeSlot) => {
            const {
              timeSlotObj,
              timeSlotLabel,
              timeSlotTime,
              isBooked,
              disabled,
            } = timeSlot;

            const timeSlotBoxClasses = `m-2 p-2 rounded-2xl ${
              clickedSlots[timeSlotTime] ? "bg-primary text-white" : ""
            } ${isBooked ? "bg-red-400 text-white" : ""}`;

            return (
              <button
                key={timeSlotObj.toISO()}
                data-cy={`book-now-time-slot-box-${timeSlotObj.hour}-${timeSlotObj.minute}`}
                className={timeSlotBoxClasses}
                onClick={() =>
                  !isBooked && !disabled && handleTimeChange(timeSlotTime)
                }
                disabled={disabled}
              >
                <span hidden className="text-center text-xs leading-none">
                  {timeSlotLabel}
                </span>
                <span className="text-md text-center leading-none">
                  {timeSlotTime}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {selectedTime && (
        <div className="mt-4 rounded-2xl p-2 shadow">
          <div className="text-center font-medium">
            Select a time slot for checkout:
          </div>
          <div className="flex flex-wrap justify-center">
            {checkoutTimeSlotsFiltered.map((timeSlot) => {
              const { timeSlotObj, timeSlotTime, isBooked, disabled } =
                timeSlot;

              const checkoutTimeBoxClasses = `m-2 p-2 rounded-2xl ${
                clickedCheckoutSlots[timeSlotTime]
                  ? "bg-primary text-white"
                  : ""
              } ${isBooked ? "bg-gray-300 text-gray-600" : ""}`;

              return (
                <button
                  key={`checkout-${timeSlotObj.toISO()}`}
                  data-cy={`checkout-time-slot-box-${timeSlotObj.hour}-${timeSlotObj.minute}`}
                  className={checkoutTimeBoxClasses}
                  onClick={() =>
                    !isBooked &&
                    !disabled &&
                    handleCheckoutTimeChange(timeSlotTime)
                  }
                  disabled={disabled}
                >
                  <span className="text-md text-center leading-none">
                    {timeSlotTime}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
