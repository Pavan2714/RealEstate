import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  Heart,
  Home,
  ShoppingBag,
  Info,
  Mail,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-[#2eb6f5]/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-1">
                <span className="text-2xl md:text-3xl font-bold text-[#2eb6f5]">
                  Nivaas
                </span>
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  360
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#2eb6f5] font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2eb6f5] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/buy"
                className="text-gray-700 hover:text-[#2eb6f5] font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Buy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2eb6f5] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/rent"
                className="text-gray-700 hover:text-[#2eb6f5] font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Rent
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2eb6f5] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#2eb6f5] font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2eb6f5] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-[#2eb6f5] font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2eb6f5] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/favorites"
                className="relative p-2.5 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Heart className="h-6 w-6 text-gray-700 group-hover:text-[#2eb6f5] group-hover:scale-110 transition-all duration-300" />
              </Link>

              {/* Purchased Button - Only for Buyers */}
              {user && user.role === "buyer" && (
                <Link
                  to="/purchased"
                  className="px-4 py-2.5 bg-white border-2 border-[#2eb6f5] text-[#2eb6f5] rounded-xl hover:bg-[#2eb6f5] hover:text-white hover:shadow-lg transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Purchased</span>
                </Link>
              )}

              {/* Create Listing Button - Only for Sellers */}
              {user && user.role === "seller" && (
                <Link
                  to="/createlisting"
                  className="px-4 py-2.5 bg-white border-2 border-[#2eb6f5] text-[#2eb6f5] rounded-xl hover:bg-[#2eb6f5] hover:text-white hover:shadow-lg transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Create Listing</span>
                </Link>
              )}

              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={user.avatar || user.photo}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="font-medium">{user.username}</span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section with Close Button (if logged in) */}
          {user ? (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              <div
                onClick={() => handleNavigation("/profile")}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <img
                  src={user.avatar || user.photo}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#2eb6f5]"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-[#2eb6f5] transition-colors">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-[#2eb6f5] font-medium capitalize mt-1">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Close button only for non-logged in users
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Home className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  Home
                </span>
              </button>

              <button
                onClick={() => handleNavigation("/buy")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <ShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  Buy
                </span>
              </button>

              <button
                onClick={() => handleNavigation("/rent")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Home className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  Rent
                </span>
              </button>

              <button
                onClick={() => handleNavigation("/about")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Info className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  About Us
                </span>
              </button>

              <button
                onClick={() => handleNavigation("/contact")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  Contact Us
                </span>
              </button>

              <button
                onClick={() => handleNavigation("/favorites")}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
              >
                <Heart className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                  Favorites
                </span>
              </button>

              {/* Purchased - Only for Buyers (Mobile) */}
              {user && user.role === "buyer" && (
                <button
                  onClick={() => handleNavigation("/purchased")}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
                >
                  <CheckCircle className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                    Purchased
                  </span>
                </button>
              )}

              {/* Create Listing - Only for Sellers (Mobile) */}
              {user && user.role === "seller" && (
                <button
                  onClick={() => handleNavigation("/createlisting")}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-[#2eb6f5]/10 transition-all duration-300 group"
                >
                  <PlusCircle className="h-5 w-5 text-gray-600 group-hover:text-[#2eb6f5] transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-[#2eb6f5] transition-colors">
                    Create Listing
                  </span>
                </button>
              )}
            </div>
          </nav>

          {/* Bottom Action Button */}
          {!user && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => handleNavigation("/signin")}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
