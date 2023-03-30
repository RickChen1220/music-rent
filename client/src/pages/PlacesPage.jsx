import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Facilities from "../Facilities";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import { Navigate } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState("");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  async function addNewPlace(e) {
    e.preventDefault();
     await axios.post("/places", {
      title, address, addedPhotos, 
      description, facilities, extraInfo, 
      openTime, closeTime, maxGuests, price,
    });
    setRedirect("/account/places");
  }
  
  if (redirect) {
    return <Navigate to={redirect} />
    }

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {inputHeader("Title")}
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="title, for example: Music Rent"
            ></input>
            {inputHeader("Address")}
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="address"
            ></input>
            {inputHeader("Photos")}
            <PhotosUploader  addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {inputHeader("Description")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {inputHeader("Facilities")}
            <Facilities selected={facilities} onChange={setFacilities} />
            {inputHeader("Extra Info")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {inputHeader("Open and close times")}
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <h3 className="mt-2 -mb-1">Open time</h3>
                <input
                  type="text"
                  value={openTime}
                  onChange={(e) => {
                    setOpenTime(e.target.value);
                  }}
                  placeholder="9"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Close time</h3>
                <input
                  type="text"
                  value={closeTime}
                  onChange={(e) => {
                    setCloseTime(e.target.value);
                  }}
                  placeholder="21"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                  placeholder="2"
                />
              </div>
            </div>
            {inputHeader("Price/per hour")}
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="$200"
            ></input>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
