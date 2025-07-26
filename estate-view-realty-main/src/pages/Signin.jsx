import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { Eye, EyeOff, Mail, Lock, Home, ArrowRight } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        showNotification(data.message || "Sign in failed!", "error");
        return;
      }
      dispatch(signInSuccess(data));
      showNotification("Sign in successful!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      dispatch(signInFailure(error.message));
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-2000 blur-sm"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-4000 blur-md"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-6000 blur-sm"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#2eb6f5]/20 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-[#2eb6f5]/10 rounded-full animate-float animation-delay-3000 blur-sm"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-12 h-12 bg-[#2eb6f5]/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-[#2eb6f5]/20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-[#2eb6f5]/25 rotate-45 animate-spin-slow animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#2eb6f5] hover:text-[#1e90ff] transition-colors duration-300 group"
        >
          <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform ${
            notification.show
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          } ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } backdrop-blur-sm border border-white/20`}
        >
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Sign In Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#2eb6f5]/20 p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-2xl mx-auto mb-4 flex items-center justify-center animate-bounce-slow">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2eb6f5] transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-[#2eb6f5] focus:ring-4 focus:ring-[#2eb6f5]/20 transition-all duration-300 hover:border-gray-300"
                    id="email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2eb6f5] transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-[#2eb6f5] focus:ring-4 focus:ring-[#2eb6f5]/20 transition-all duration-300 hover:border-gray-300"
                    id="password"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2eb6f5] transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#2eb6f5] focus:ring-[#2eb6f5] transition-all duration-300"
                  />
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#2eb6f5] hover:text-[#1e90ff] hover:underline transition-all duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2eb6f5]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e90ff] to-[#2eb6f5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* OAuth Component */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-600">
                    Or continue with
                  </span>
                </div>
              </div>

              <OAuth />
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-[#2eb6f5] hover:text-[#1e90ff] hover:underline font-medium transition-all duration-300 group"
                >
                  Sign Up
                  <ArrowRight className="inline h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center animate-fade-in-up animation-delay-500">
            <p className="text-sm text-gray-500">
              Secure login with end-to-end encryption
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(8px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-spin-slow,
          .animate-bounce-slow {
            animation: none;
          }

          .animate-fade-in-up {
            animation-duration: 0.2s;
          }
        }
      `}</style>
    </div>
  );
}
