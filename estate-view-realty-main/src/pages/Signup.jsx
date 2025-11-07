import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Home,
  ArrowRight,
  UserPlus,
  Shield,
} from "lucide-react";
import OAuth from "../components/OAuth";
import OAuthSignUp from "../components/OAuthSignUp";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function Signup() {
  const [formData, setFormData] = useState({ role: "buyer" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  // Handle notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      formData.role === "seller"
        ? `${API_URL}/api/auth/signup/seller`
        : `${API_URL}/api/auth/signup/buyer`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      let data = {};
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      }

      if (data.success === false) {
        setLoading(false);
        if (
          data.message &&
          (data.message.toLowerCase().includes("email") ||
            data.message.toLowerCase().includes("duplicate"))
        ) {
          showNotification("User already exists with this email!", "error");
        } else {
          showNotification(data.message || "Signup failed!", "error");
        }
        return;
      }

      setLoading(false);
      if (res.ok) {
        showNotification("Signup successful!", "success");
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        showNotification(data.message || "Signup failed!", "error");
        setLoading(false);
      }
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm will-change-transform"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-2000 blur-sm will-change-transform"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-4000 blur-md will-change-transform"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-6000 blur-sm will-change-transform"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#2eb6f5]/20 rounded-full animate-float animation-delay-1000 will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-[#2eb6f5]/10 rounded-full animate-float animation-delay-3000 blur-sm will-change-transform"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-12 h-12 bg-[#2eb6f5]/15 rotate-45 animate-spin-slow will-change-transform"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-[#2eb6f5]/20 animate-bounce-slow will-change-transform"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-[#2eb6f5]/25 rotate-45 animate-spin-slow animation-delay-4000 will-change-transform"></div>
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
          {/* Sign Up Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#2eb6f5]/20 p-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-2xl mx-auto mb-4 flex items-center justify-center animate-bounce-slow">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join our community and start your journey
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2eb6f5] transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-[#2eb6f5] focus:ring-4 focus:ring-[#2eb6f5]/20 transition-all duration-300 hover:border-gray-300"
                    id="username"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-[#2eb6f5] focus:ring-4 focus:ring-[#2eb6f5]/20 transition-all duration-300 hover:border-gray-300"
                    id="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.role === "buyer"
                        ? "border-[#2eb6f5] bg-[#2eb6f5]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={formData.role === "buyer"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center w-full">
                      <Home
                        className={`h-6 w-6 mb-2 ${
                          formData.role === "buyer"
                            ? "text-[#2eb6f5]"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          formData.role === "buyer"
                            ? "text-[#2eb6f5]"
                            : "text-gray-600"
                        }`}
                      >
                        Buy Properties
                      </span>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.role === "seller"
                        ? "border-[#2eb6f5] bg-[#2eb6f5]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={formData.role === "seller"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center w-full">
                      <Shield
                        className={`h-6 w-6 mb-2 ${
                          formData.role === "seller"
                            ? "text-[#2eb6f5]"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          formData.role === "seller"
                            ? "text-[#2eb6f5]"
                            : "text-gray-600"
                        }`}
                      >
                        Sell Properties
                      </span>
                    </div>
                  </label>
                </div>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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

              <OAuthSignUp />
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/Signin"
                  className="text-[#2eb6f5] hover:text-[#1e90ff] hover:underline font-medium transition-all duration-300 group"
                >
                  Sign In
                  <ArrowRight className="inline h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center animate-fade-in-up animation-delay-500">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(10px, -20px, 0);
          }
          50% {
            transform: translate3d(-5px, -10px, 0);
          }
          75% {
            transform: translate3d(8px, -15px, 0);
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
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }

        .will-change-transform {
          will-change: transform;
        }

        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 1s; }
        .animation-delay-3000 { animation-delay: 1.5s; }
        .animation-delay-4000 { animation-delay: 2s; }
        .animation-delay-6000 { animation-delay: 2.5s; }

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

        .animate-float,
        .animate-spin-slow,
        .animate-bounce-slow,
        .animate-fade-in-up {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
