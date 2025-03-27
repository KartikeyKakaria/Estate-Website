import { useSelector } from "react-redux";
import useProtect from "../hooks/useProtect";
const Profile = () => {
  useProtect();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2"
          src={currentUser.avatar}
          alt=""
        />
        <input
          type="text"
          placeholder="username"
          className="bg-white border p-3 rounded-md "
          name="username"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="bg-white border p-3 rounded-md "
          name="email"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-white border p-3 rounded-md "
          name="password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-md p-3 uppercase hover:opacity-95 cursor-pointer disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-3">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>

      </form>
    </div>
  );
};

export default Profile;
