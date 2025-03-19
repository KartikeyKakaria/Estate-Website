import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
function oAuth() {
  const handleGoogle = async function () {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log("Couldn't sign in with google ", error);
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

export default oAuth;
