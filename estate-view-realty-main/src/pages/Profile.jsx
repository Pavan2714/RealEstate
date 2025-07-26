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

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Safely get profile image
  const profileImg = user?.avatar || user?.photo || defaultProfileImg;

  // Prevent rendering if user is null
  if (!user) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6 mt-10">
        <h1 className="text-4xl font-bold text-center mb-4">Profile</h1>
        <p className="text-gray-500 text-center">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  const handleFileUpload = useCallback(
    (file) => {
      setUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const base64Image = reader.result;
          const res = await fetch(`${API_URL}/api/user/upload/${user._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: base64Image }),
          });

          const data = await res.json();
          if (data.success === false) {
            console.error(data.message);
          } else {
            dispatch(signInSuccess(data));
          }
        } catch (err) {
          console.error("Error uploading image:", err);
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        setUploading(false);
      };
    },
    [user._id, dispatch]
  );

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    try {
      const res = await fetch(`${API_URL}/api/user/update/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setUpdateError(data.message);
      } else {
        dispatch(signInSuccess(data));
        setUpdateSuccess(true);
        navigate("/");
      }
    } catch (err) {
      setUpdateError("Update failed. Please try again.");
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
      const res = await fetch(`${API_URL}/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess());
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/signup");
        alert("Account deleted successfully!");
      } else {
        dispatch(deleteUserFailure(data.message || "Failed to delete account"));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
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
        const errorData = await res.json();
        dispatch(signOutUserFailure(errorData.message || "Sign out failed"));
        return;
      }
      await res.json();
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch(signOutUserSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // ...existing code...
  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-[#1a1a1a] via-[#2eb6f5] to-[#2eb6f5]">
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
                <p className="text-white font-medium">Uploading...</p>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col space-y-4">
            <label className="font-semibold text-[#2eb6f5]">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium"
            />
            <label className="font-semibold text-[#2eb6f5]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium"
            />
            <label className="font-semibold text-[#2eb6f5]">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] p-3 rounded-xl transition-colors duration-200 shadow-sm w-full bg-[#F7FBFF] font-medium"
            />
          </div>
          {updateError && (
            <p className="text-red-500 text-sm mt-2">{updateError}</p>
          )}
          {updateSuccess && (
            <p className="text-green-500 text-sm mt-2">Profile updated!</p>
          )}
          <button
            type="submit"
            disabled={updateLoading}
            className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-[#1a1a1a] to-[#2eb6f5] text-white font-bold rounded-xl shadow-lg hover:bg-[#2eb6f5] transition-colors duration-200 disabled:opacity-60"
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
  );
  // ...existing code...
}
