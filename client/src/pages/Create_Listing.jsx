import React from "react";
import useProtect from "../hooks/useProtect";
import { useSelector } from "react-redux";

const Create_Listing = () => {
  useProtect();
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) return;
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
    </div>
  );
};

export default Create_Listing;
