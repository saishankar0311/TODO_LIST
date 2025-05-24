/* eslint-disable react/prop-types */
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { app } from "../firebase.js";
import { setCredentials } from "../redux/features/auth/authSlice";
import Button from "./Button";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const OAuth = ({ title }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      // Extract user information from the Google response
      const { displayName, email, photoURL } = resultsFromGoogle.user;

      // Send user information to your backend
      const res = await fetch(`${baseUrl}/api/v1/user/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email: email,
          googlePhotoUrl: photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(setCredentials(data));
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to log in with Google");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("An error occurred during Google sign-in");
    }
  };

  return (
    <Button
      type="button"
      className="bg-blue-600 text-white mx-auto block rounded-md p-2 m-4 justify-center"
      onClick={handleGoogleClick}
    >
      {title}
    </Button>
  );
};

export default OAuth;
