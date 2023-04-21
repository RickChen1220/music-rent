import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState("");

  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);
  return (
    <div className="mt-8 mx-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <div className="col-span-2 md:col-span-3 lg:col-span-6 relative mx-auto">
        <input
          placeholder="Search"
          className="bg-white rounded-2xl p-2 pr-10"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className=" absolute top-1/2 transform -translate-y-1/2 left-[190px]">
          <FaSearch
            size={30}
            style={{
              color: "white",
            }}
            className="cursor-pointer bg-primary rounded-full p-2"
          />
        </div>
      </div>
      {places.length > 0 &&
        places
          .filter((place) => {
            if (search === "") {
              return place;
            } else if (
              place.title.toLowerCase().includes(search.toLowerCase()) ||
              place.address.toLowerCase().includes(search.toLowerCase())
            ) {
              return place;
            }
            place.title.includes(search);
          })
          .map((place) => (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="mb-2 bg-slate-500 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.title}</h2>
              <h3 className="text-sm  text-slate-600">{place.address}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
    </div>
  );
}
