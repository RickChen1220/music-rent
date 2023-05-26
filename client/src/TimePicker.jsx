import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

export default function TimePicker({ onTimeSelect, selectedDate }) {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [clickedSlots, setClickedSlots] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [cannotPick, setCannotPick] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (selectedTime) {
      const selectedTimeObj = DateTime.fromFormat(selectedTime, "HH:mm");
      const cannotPickObj = selectedTimeObj.plus({ minutes: 30 });
      const formattedCannotPick = cannotPickObj.toFormat("HH:mm");
      setCannotPick(formattedCannotPick);
    }
  }, [selectedTime]);

  if (!place) return "";

  const now = DateTime.now();
  const isToday = selectedDate.toDateString() === now.toJSDate().toDateString();

  // Create an array of time slots with 30-minute intervals
  const timeSlots = [];
  let startTime = DateTime.fromJSDate(selectedDate);
  startTime = startTime.set({
    hour: place.openTime,
    minute: 0,
  });

  let endTime = DateTime.fromJSDate(selectedDate);
  endTime = endTime.set({
    hour: place.closeTime,
    minute: 0,
  });
  // Subtract one hour from closing time to allow for the last booking to end at the closing time
  endTime = endTime.minus({ minutes: 30 });

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
    if (startTime >= endTime) {
      return null;
    }
  }

  while (startTime < endTime) {
    // If the selected date is today, skip time slots that are before the current time
    const timeSlot = new Date(startTime);
    if (isToday && timeSlot <= now.toJSDate()) {
      startTime = startTime.plus({ minutes: 30 });
      continue;
    }
    const timeSlotObj = DateTime.fromJSDate(timeSlot);
    const timeSlotLabel = timeSlotObj.toFormat("EEEE, LLLL d");
    const timeSlotTime = timeSlotObj.toFormat("HH:mm");
    const isDisabled = timeSlotTime === cannotPick;

    timeSlots.push({
      timeSlotObj,
      timeSlotLabel,
      timeSlotTime,
      isDisabled,
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
    setClickedSlots(updatedClickedSlots);
    console.log("selectedTime:", isSelected ? "Now is empty" : selectedTime);
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
          {timeSlots.map((timeSlot) => {
            const { timeSlotObj, timeSlotLabel, timeSlotTime, isDisabled } =
              timeSlot;

            const timeSlotBoxClasses = `m-2 p-2 rounded-2xl ${
              clickedSlots[timeSlotTime] ? "bg-primary text-white" : ""
            }`;

            return (
              <button
                key={timeSlotObj.toISO()}
                data-cy={`book-now-time-slot-box-${timeSlotObj.hour}-${timeSlotObj.minute}`}
                className={timeSlotBoxClasses}
                onClick={() => handleTimeChange(timeSlotTime)}
                disabled={isDisabled}
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
    </div>
  );
}
