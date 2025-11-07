import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  Home,
  Building2,
  Heart,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Properties", path: "/properties", icon: Building2 },
    { name: "Favorites", path: "/favorites", icon: Heart },
  ];

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#2eb6f5]/10"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] bg-clip-text text-transparent">
                Estate View
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-gray-700 hover:text-[#2eb6f5] font-medium transition-colors duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {/* Desktop Profile/Auth */}
              <div className="flex items-center gap-4">
                {user ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={user.avatar || user.photo}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-white"
                    />
                    <span className="font-medium">{user.username}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 px-4 py-2 text-[#2eb6f5] hover:text-[#1e90ff] font-medium transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-[#2eb6f5]/10 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-bold bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] bg-clip-text text-transparent">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2eb6f5]/10 hover:text-[#2eb6f5] transition-all duration-200 font-medium"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="mt-6 px-3">
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white hover:shadow-lg transition-all duration-200"
                    >
                      <img
                        src={user.avatar || user.photo}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-white"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-xs text-white/80">{user.email}</p>
                      </div>
                      <User className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-[#2eb6f5] text-[#2eb6f5] hover:bg-[#2eb6f5]/10 transition-all duration-200 font-medium"
                    >
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white hover:shadow-lg transition-all duration-200 font-medium"
                    >
                      <UserPlus className="h-5 w-5" />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-center text-gray-500">
              © 2025 Estate View Realty
            </p>
          </div>
        </div>
      </div>

      {/* Prevent body scroll when mobile menu is open */}
      <style>{`
        ${isMobileMenuOpen ? "body { overflow: hidden; }" : ""}
      `}</style>
    </>
  );
}
