import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Calendar from "../Calendar";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-slate-100 mx-0 px-8 pt-8 ">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-2">
            <h2 className="font-semibold text-2xl">Description</h2>
            <div className="my-6">
              {place.description}
            </div>
          </div>
          <div className="">
          Open time: {place.openTime}
          <br />
          Close time: {place.closeTime}
          <br />
          Max number of guests: {place.maxGuests}
          </div>
          <div>
            <Calendar />
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-slate-100 -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
