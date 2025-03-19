import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async function () {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const googleUser = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: googleUser.user.displayName,
          email: googleUser.user.email,
          photo: googleUser.user.photoURL,
        }),
      });
      const result = await res.json();
      dispatch(signInSuccess(result));
      navigate("/")
    } catch (error) {
      console.log("Couldn't sign in with google ", error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <button
      onClick={handleGoogle}
      type="button"
      className="hover:opacity-90 cursor-pointer bg-red-700 rounded-md text-white p-3 uppercase "
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
