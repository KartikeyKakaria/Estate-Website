import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import useProtect from "../hooks/useProtect";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router";
import convertImg from "../utils/base64.util.js";

// TODO: ADD IMAGE UPLOAD FUNCTIONALITY WITHOUT FIREBASE

const Profile = () => {
  useProtect();
  const [tempSrc, setSrc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
  });
  const [success, updateSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertImg(file);
    setFormData({ ...formData, avatar: base64 });
    setSrc(base64);
  };
  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.sucess === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      navigate;
    } catch (e) {
      dispatch(deleteUserFailure(e.message));
      navigate(`/sign-in`);
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      window.location.href = "/sign-in";
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(updateUserSuccess(data));
      updateSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };
  if (!currentUser) return;
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleImgUpload}
          className="hidden"
          accept="image/*"
          ref={fileRef}
          type="file"
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2"
          src={formData.avatar}
          alt=""
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="username"
          className="bg-white border p-3 rounded-md "
          name="username"
          id="username"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="text"
          placeholder="email"
          className="bg-white border p-3 rounded-md "
          name="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-white border p-3 rounded-md "
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white rounded-md p-3 uppercase hover:opacity-95 cursor-pointer disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <div className="flex justify-between mt-3">
          <span onClick={deleteUser} className="text-red-700 cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignout} className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
      </form>
      <p className="text-red-400 mt-4">{error ? error : ""}</p>
      <p className="text-green-400 mt-4">
        {success ? "User Updated successfully" : ""}
      </p>
    </div>
  );
};

export default Profile;
