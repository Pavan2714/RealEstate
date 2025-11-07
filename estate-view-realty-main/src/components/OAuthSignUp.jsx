import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Store } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function OAuthSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Store Google user data and show role selection
      setGoogleUserData({
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      setShowRoleSelection(true);
      setLoading(false);
    } catch (error) {
      console.error("Could not sign in with Google:", error);
      alert("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  const handleRoleSelection = async (role) => {
    setSelectedRole(role);
    setLoading(true);

    try {
      // Send Google user data with role to backend
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...googleUserData,
          role: role,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        console.error("Google sign-up failed:", data.message);
        alert(data.message || "Failed to sign up with Google");
        setShowRoleSelection(false);
        setGoogleUserData(null);
        setSelectedRole("");
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Could not complete sign up:", error);
      alert("Failed to complete sign up. Please try again.");
      setShowRoleSelection(false);
      setGoogleUserData(null);
      setSelectedRole("");
    } finally {
      setLoading(false);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="space-y-6">
        {/* Role Selection UI */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Select Your Role
          </h3>
          <p className="text-gray-600 text-sm">
            Choose how you want to use Nivaas360
          </p>
        </div>

        <div className="space-y-3">
          {/* Buyer Option */}
          <button
            onClick={() => handleRoleSelection("buyer")}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#2eb6f5] hover:bg-[#2eb6f5]/5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900 group-hover:text-[#2eb6f5] transition-colors">
                  I am a Buyer
                </h4>
                <p className="text-sm text-gray-600">
                  Looking to buy or rent properties
                </p>
              </div>
            </div>
          </button>

          {/* Seller Option */}
          <button
            onClick={() => handleRoleSelection("seller")}
            disabled={loading}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-[#2eb6f5] hover:bg-[#2eb6f5]/5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900 group-hover:text-[#2eb6f5] transition-colors">
                  I am a Seller
                </h4>
                <p className="text-sm text-gray-600">
                  Want to list properties for sale or rent
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-[#2eb6f5]">
            <div className="w-5 h-5 border-2 border-[#2eb6f5]/30 border-t-[#2eb6f5] rounded-full animate-spin"></div>
            <span className="text-sm font-medium">
              Creating your account...
            </span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => {
            setShowRoleSelection(false);
            setGoogleUserData(null);
            setSelectedRole("");
          }}
          disabled={loading}
          className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors disabled:opacity-50"
        >
          ← Back to sign up options
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      disabled={loading}
      className="w-full relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}
