import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState("");
    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post("/upload-by-link", {
          link: photoLink,
        });
        onChange((pre) => {
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
    
        const { data: filenames } = await axios.post("/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onChange((pre) => {
          return [...pre, ...filenames];
        });
      }
    
    return(
        <>
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
              {/* Show photo add by link and device */}
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  return (
                    <div className="h-32 flex" key={link}>
                      <img
                        className="rounded-2xl w-full object-cover"
                        src={"http://localhost:4000/uploads/" + link}
                      />
                    </div>
                  );
                })}
              {/* Add photo from local */}
              <label className="flex h-32 items-center justify-center gap-1 border rounded-2xl p-2 text-2xl  bg-slate-100 cursor-pointer">
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
        </>
    )
}