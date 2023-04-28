import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TimePicker() {
  const { id } = useParams();
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";

  // Create an array of time slots with 30-minute intervals
  const timeSlots = [];
  let startTime = new Date();
  startTime.setHours(place.openTime);
  startTime.setMinutes(0);
  const endTime = new Date();
  endTime.setHours(place.closeTime);
  endTime.setMinutes(0 - 30);
  while (startTime < endTime) {
    timeSlots.push(new Date(startTime));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  // Create a label for the time range
  const label = `From ${place.openTime} to ${place.closeTime}`;

  return (
    <div>
      <div className="shadow p-2 rounded-2xl">
        <div id="time-range-label" className="text-center font-medium mb-2">
          {label}
        </div>
        <div
          aria-labelledby="time-range-label"
          className="flex flex-wrap justify-center"
        >
          {timeSlots.map((timeSlot) => (
            <button
              key={timeSlot.toISOString()}
              data-cy={`book-now-time-slot-box-${timeSlot.getHours()}-${timeSlot.getMinutes()}`}
              className="m-2 p-2 rounded-2xl"
            >
              <span hidden className="text-xs text-center leading-none">
                {timeSlot.toLocaleDateString()}
              </span>
              <span className="text-md text-center leading-none">
                {timeSlot.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}