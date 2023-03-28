import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Facilities from "../Facilities";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((pre) => {
      return [...pre, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { data: filename } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setAddedPhotos((pre) => {
      return [...pre, filename];
    });
    setPhotoLink("");
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
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => {
                  setPhotoLink(e.target.value);
                }}
                placeholder="Link for your photo ....jpg"
              ></input>
              <button
                className="border bg-slate-300 rounded-2xl p-2"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className=" mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {/* Add photo by link */}
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  return (
                    <div>
                      <img
                        className="rounded-2xl"
                        src={"http://localhost:4000/uploads/" + link}
                      />
                    </div>
                  );
                })}
              {/* Add photo from local */}
              <label className="flex items-center justify-center gap-1 border rounded-2xl p-2 text-2xl  bg-slate-100 cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Upload
              </label>
            </div>
            {inputHeader("Description")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {inputHeader("Facilities")}
            <Facilities selected={facilities} onChanged={setFacilities} />
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
                  placeholder="09:00"
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
                  placeholder="21:00"
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
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
