import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [googleUserData, setGoogleUserData] = useState(null);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      setGoogleUserData(result.user);
      setShowRoleSelection(true);
    } catch (error) {
      console.log("could not signin with google", error);
    }
  };

  const handleRoleSubmit = async () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }
    if (!googleUserData) {
      console.error("Google user data not available.");
      return;
    }

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: googleUserData.displayName,
          email: googleUserData.email,
          photo: googleUserData.photoURL,
          role: selectedRole,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not signin with google after role selection", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {showRoleSelection ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-center font-semibold my-7">
            Select Your Role
          </h2>
          <button
            type="button"
            onClick={() => setSelectedRole("buyer")}
            className={`w-full py-3 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-300 ${
              selectedRole === "buyer"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
          >
            I am a Buyer
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("seller")}
            className={`w-full py-3 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-300 ${
              selectedRole === "seller"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-green-100"
            }`}
          >
            I am a Seller
          </button>
          <button
            type="button"
            onClick={handleRoleSubmit}
            className="w-full py-3 rounded-xl bg-purple-500 text-white font-semibold text-base sm:text-lg hover:bg-purple-600 transition-colors duration-300"
          >
            Continue
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleClick}
          type="button"
          className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-base sm:text-lg hover:bg-red-600 transition-colors duration-300"
        >
          Continue with Google
        </button>
      )}
    </div>
  );
}
