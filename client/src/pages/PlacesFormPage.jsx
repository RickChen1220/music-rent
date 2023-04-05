import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Facilities from "../Facilities";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const {id} = useParams();
  console.log({id});
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
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if(!id){
      return;
    }
    axios.get("/places/"+id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setFacilities(data.facilities);
      setOpenTime(data.openTime);
      setCloseTime(data.closeTime);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  },[id])

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeDate = {
        title,
        address,
        addedPhotos,
        description,
        facilities,
        extraInfo,
        openTime,
        closeTime,
        maxGuests,
        price,
    };
    if (id) {
      //update
      await axios.put("/places", {
        id,...placeDate
      });
      setRedirect(true);
    } else{
      //new place
      await axios.post("/places", {placeDate});
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
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
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
  );
}
