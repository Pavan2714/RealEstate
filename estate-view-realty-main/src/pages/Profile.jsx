import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import defaultProfileImg from "../assets/profile.png";
import Header from "@/components/Header";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Keep form in sync if store user updates
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Safely get profile image
  const profileImg = user?.avatar || user?.photo || defaultProfileImg;

  // Prevent rendering if user is null
  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe]">
          <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6">
            <h1 className="text-4xl font-bold text-center mb-4 text-[#2eb6f5]">
              Profile
            </h1>
            <p className="text-gray-500 text-center">
              Please sign in to view your profile.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleFileUpload = useCallback(
    async (file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please upload an image file");
        return;
      }

      // Validate file size (max 2MB for better compatibility)
      if (file.size > 2 * 1024 * 1024) {
        setUploadError("Image size should be less than 2MB");
        return;
      }

      setUploading(true);
      setUploadError(null);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const base64Image = reader.result;

          console.log("Uploading image for user:", user._id);
          console.log("Image size:", base64Image.length, "characters");

          const res = await fetch(`${API_URL}/api/user/upload/${user._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ avatar: base64Image }),
          });

          console.log("Response status:", res.status);
          const data = await res.json();
          console.log("Response data:", data);

          if (!res.ok) {
            console.error("Upload failed:", data);
            setUploadError(data.message || `Upload failed: ${res.status}`);
            return;
          }

          // Check different response formats
          if (data.success && data.data) {
            console.log("Upload successful, updating Redux store");
            dispatch(signInSuccess(data.data));
            setUploadError(null);
            // Clear file state after successful upload
            setFile(undefined);
            if (fileRef.current) {
              fileRef.current.value = "";
            }
          } else if (data.avatar) {
            // Alternative response format
            console.log("Upload successful (alt format), updating Redux store");
            dispatch(signInSuccess({ ...user, avatar: data.avatar }));
            setUploadError(null);
            // Clear file state after successful upload
            setFile(undefined);
            if (fileRef.current) {
              fileRef.current.value = "";
            }
          } else {
            console.error("Unexpected response format:", data);
            setUploadError("Failed to update profile picture");
          }
        } catch (err) {
          console.error("Error uploading image:", err);
          setUploadError(`Network error: ${err.message}`);
        } finally {
          // Always clear uploading state
          setUploading(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        setUploadError("Error reading file. Please try again.");
        setUploading(false);
      };
    },
    [user, dispatch]
  );

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.username || !formData.email) {
      setUpdateError("Username and email are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setUpdateError("Please enter a valid email address");
      return;
    }

    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (!res.ok) {
        setUpdateError(data.message || "Update failed");
      } else {
        // API returns { success, data: updatedUser }
        if (data.success && data.data) {
          dispatch(signInSuccess(data.data));
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 3000);
        } else if (data._id) {
          // Alternative format: backend returns user directly
          dispatch(signInSuccess(data));
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 3000);
        } else {
          setUpdateError("Update failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Update error:", err);
      setUpdateError("Network error. Please check your connection.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      dispatch(deleteUserStart());

      // No headers/body to avoid preflight; credentials to send cookie
      const res = await fetch(`${API_URL}/api/user/delete/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        dispatch(deleteUserSuccess());
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/signup");
        alert("Account deleted successfully!");
      } else {
        dispatch(deleteUserFailure(data.message || "Failed to delete account"));
        alert(data.message || "Failed to delete account");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${API_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        dispatch(signOutUserFailure(errorData.message || "Sign out failed"));
        return;
      }
      await res.json().catch(() => ({}));
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(signOutUserSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe]">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#2eb6f5]/30 flex flex-col items-center px-8 py-10 space-y-8">
          <h1 className="text-4xl font-extrabold text-[#2eb6f5] text-center mb-2 tracking-tight">
            Profile
          </h1>
          <form
            className="w-full flex flex-col items-center space-y-6"
            onSubmit={handleSubmit}
          >
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div className="relative group">
              <img
                onClick={() => fileRef.current.click()}
                src={profileImg}
                className="rounded-full h-36 w-36 object-cover border-4 border-[#2eb6f5] shadow-lg ring-4 ring-[#2eb6f5]/30 hover:ring-[#1a1a1a] transition-all duration-300 cursor-pointer group-hover:scale-105"
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfileImg;
                }}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-white font-medium text-sm">
                      Uploading...
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-[#2eb6f5] text-white p-2 rounded-full cursor-pointer hover:bg-[#1e90ff] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>

            {/* Upload Error */}
            {uploadError && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">
                  {uploadError}
                </p>
              </div>
            )}

            <div className="w-full flex flex-col space-y-4">
              <label className="font-semibold text-[#2eb6f5]">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium focus:outline-none"
              />
              <label className="font-semibold text-[#2eb6f5]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium focus:outline-none"
              />
              <label className="font-semibold text-[#2eb6f5]">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium focus:outline-none"
              />
            </div>
            {updateError && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">
                  {updateError}
                </p>
              </div>
            )}
            {updateSuccess && (
              <div className="w-full p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-600 text-sm text-center font-medium">
                  Profile updated successfully!
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={updateLoading || uploading}
              className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-[#1a1a1a] to-[#2eb6f5] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 hover:scale-[1.02]"
            >
              {updateLoading ? "Updating..." : "UPDATE"}
            </button>
          </form>
          <div className="flex justify-between w-full pt-2">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 font-semibold cursor-pointer hover:underline hover:text-red-700 transition-colors"
            >
              Delete account
            </span>
            <span
              onClick={handleSignOut}
              className="text-[#2eb6f5] font-semibold cursor-pointer hover:underline hover:text-[#1a1a1a] transition-colors"
            >
              Sign out
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
