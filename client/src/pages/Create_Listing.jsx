import React, { useRef, useState } from "react";
import useProtect from "../hooks/useProtect";
import { useSelector } from "react-redux";
import Notification from "../components/Notification";

const Create_Listing = () => {
  useProtect();
  const { currentUser } = useSelector((state) => state.user);
  const filesRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const handleUpload = async (e) => {
    e.preventDefault();
    if (filesRef.current.files.length + files.length > 6) {
      setError("Cannot Upload more than 6 images");
      return;
    }
    setLoading(true);
    try {
      const promises = Array.from(filesRef.current.files).map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve({
              name: file.name,
              src: fileReader.result,
              id: Math.random(),
              file,
            });
          };
          fileReader.onerror = (e) => {
            reject(e);
          };
        });
      });
      const Data = await Promise.all(promises);
      setFiles([...files, ...Data]);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  if (!currentUser) return;
  return (
    <div className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-4 left flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="bg-white border p-3 rounded-md"
              id="name"
              maxLength={62}
              minLength={10}
              required
            />
            <textarea
              type="text"
              name="description"
              placeholder="description"
              className="bg-white border p-3 rounded-md"
              id="description"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="address"
              className="bg-white border p-3 rounded-md"
              id="address"
              maxLength={62}
              minLength={10}
              required
            />
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" name="rent" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                name="parking_spot"
                id="parking_spot"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                name="furnished"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" name="offer" id="offer" />
              <span>Offer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input
                  className="p-2 bg-white border border-gray-300 rounded-sm"
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min={1}
                  max={10}
                  required
                />
                <p>Bedrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-2 bg-white border border-gray-300 rounded-sm"
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min={1}
                  max={10}
                  required
                />
                <p>Bathrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-2 bg-white border border-gray-300 rounded-sm"
                  type="number"
                  name="reg_price"
                  id="reg_price"
                  min={1}
                  max={10}
                  required
                />
                <div className="flex flex-col">
                  <p>Regular Price</p>
                  <span>{`($/ month)`} </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-2 bg-white border border-gray-300 rounded-sm"
                  type="number"
                  name="disc_price"
                  id="disc_price"
                  min={1}
                  max={10}
                  required
                />
                <div className="flex flex-col">
                  <p>Discounted Price</p>
                  <span>{`($/ month)`} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 right gap-4">
          <div className="flex">
            <p className="font-semibold">Images:</p>
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6){" "}
            </span>
          </div>
          <div className="flex gap-4">
            <input
              ref={filesRef}
              className="p-3 border border-gray-300 rounded-md w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleUpload}
              className="p-3 cursor-pointer text-green-700 border border-green-700 rounded uppercase hover:bg-green-700 hover:text-white disabled:opacity-80"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="images flex flex-col gap-3">
            <Notification
              color="red"
              message={error}
              fn={() => setError("")}
            />
            {files.map((file) => {
              return (
                <div
                  key={file.id}
                  className="flex gap-4 border-b-2 border-b-gray-700 p-2 justify-between items-center"
                >
                  <div className="flex gap-2 items-center">
                    <img src={file.src} alt={file.name} className="h-20 w-30" />
                    <p>{file.name}</p>
                  </div>
                  <button
                    type="button"
                    id={file.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setFiles(
                        files.filter((comp) => {
                          console.log(comp.id, e.target.id);
                          return comp.id != e.target.id;
                        })
                      );
                    }}
                    className="text-red-500 border-none hover:bg-red-500 p-2 hover:text-white rounded-md cursor-pointer"
                  >
                    DELETE
                  </button>
                </div>
              );
            })}
            <p
              onClick={() => setFiles([])}
              className="cursor-pointer text-green-500"
            >
              Clear All
            </p>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-md uppercase hover:opacity-90 disabled:opacity-80 cursor-pointer">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_Listing;
