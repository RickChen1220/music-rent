import AccountNav from "../AccountNav";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav user={user}/>
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white
                 py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                className="cursor-pointer gap-4 flex p-4 border m-4 bg-slate-200 rounded-2xl"
                key={place._id}
              >
                {/*photo shoud not shrink  */}
                <div className="flex w-32 h-32 bg-slate-100 shrink-0">
                  <PlaceImg place={place} />
                </div>
                {/*Content shoud not grow but shrink  */}
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                  <h3 className="text-sm mt-6">{place.city}</h3>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
