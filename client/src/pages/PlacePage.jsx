import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Calendar from "../Calendar";
import TimePicker from "../TimePicker";
import { DateTime } from "luxon";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);

  function handleSelectTime(time) {
    setSelectedTime(time);
  }

  function handleCheckoutTime(time) {
    setCheckoutTime(time);
  }

  function handlePhotoClick() {
    setShowCalendar(false);
  }

  function handlePhotoClose() {
    setShowCalendar(true);
  }

  function handleSetDate(newDate) {
    setDate(newDate);
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";

  const today = DateTime.now().startOf("day");
// Create a new Date object using the selected date state
const selectedDateObj = DateTime.fromISO(date).startOf("day");
const isTodayOrFutureDate = selectedDateObj >= today;
const selectedDateOnly = date.split("T")[0];


  return (
    <div className="mx-0 mt-4 bg-slate-100 px-8 pt-8 ">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery
        place={place}
        onPhotoClick={handlePhotoClick}
        onCloseClick={handlePhotoClose}
      />
      <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-2">
            <h2 className="text-2xl font-semibold">Description</h2>
            <div className="my-6">{place.description}</div>
          </div>
          <div className="">
            Open time: {place.openTime}
            <br />
            Close time: {place.closeTime}
            <br />
            Max number of guests: {place.maxGuests}
          </div>
          {showCalendar && (
            <div>
              <Calendar setDate={handleSetDate} />
            </div>
          )}
          {/* Render TimePicker only if selected date is not in the past */}
          {isTodayOrFutureDate ? (
            <div>
              <TimePicker
                onTimeSelect={handleSelectTime}
                selectedDate={selectedDateObj.toJSDate()}
                onCheckoutTimeChange={handleCheckoutTime}
              />
            </div>
          ) : (
            <p className="mt-10 text-2xl font-semibold">
              You cannot book a place in the past.
            </p>
          )}
        </div>
        <div>
          <BookingWidget
            place={place}
            selectedTime={selectedTime}
            checkoutTime={checkoutTime}
            selectedDate={selectedDateOnly}
          />
        </div>
      </div>
      <div className="-mx-8 border-t bg-slate-100 px-8 py-8">
        <div>
          <h2 className="text-2xl font-semibold">Extra info</h2>
        </div>
        <div>
          <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}