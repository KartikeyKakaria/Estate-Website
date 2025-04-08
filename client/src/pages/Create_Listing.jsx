import React from "react";
import useProtect from "../hooks/useProtect";
import { useSelector } from "react-redux";

const Create_Listing = () => {
  useProtect();
  const { currentUser } = useSelector((state) => state.user);
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
              className="p-3 border border-gray-300 rounded-md w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 cursor-pointer text-green-700 border border-green-700 rounded uppercase hover:bg-green-700 hover:text-white disabled:opacity-80">
              Upload
            </button>
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
