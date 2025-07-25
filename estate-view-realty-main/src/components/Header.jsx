import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const navItems = [
    { name: "Home", href: "/" },
    ...(user?.role !== "seller"
      ? [
          { name: "Buy", href: "/buy" },
          { name: "Rent", href: "/rent" },
        ]
      : []),
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    // ...existing code...
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap group cursor-pointer transition-transform duration-300 hover:scale-105">
              <span className="text-[#2eb6f5]">Nivaas</span>
              <span className="text-[#000000] ml-1">360</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 text-black hover:text-[#2eb6f5] hover:scale-105",
                  location.pathname === item.href
                    ? "text-[#2eb6f5] scale-105"
                    : ""
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative group">
              <Link to="/favorites" className="relative group">
                <Button variant="ghost" size="icon">
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.length > 0 ? "animate-pulse text-red-500" : ""
                    }`}
                  />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-2">Favorites</h4>
                  {favorites.length === 0 ? (
                    <p className="text-sm text-gray-500">No favorites yet.</p>
                  ) : (
                    favorites.map((fav) => (
                      <Link
                        to={`/property/${fav._id}`}
                        key={fav._id}
                        className="block px-2 py-1 hover:bg-blue-50 text-sm transition-all duration-200 rounded"
                      >
                        {fav.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {!user && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="transition-transform duration-300 hover:scale-105"
              >
                <a href="/Signup">Sign Up</a>
              </Button>
            )}

            {user?.role !== "seller" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/purchased")}
                className="transition-transform duration-300 hover:scale-105"
              >
                Purchased
              </Button>
            )}

            {user?.role === "seller" && (
              <Button
                size="sm"
                onClick={() => navigate("/Createlisting")}
                className="transition-transform duration-300 hover:scale-105"
              >
                Create Listing
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5 flex md:hidden" />
            )}
          </Button>

          {user ? (
            <Link to="/Profile">
              <img
                className="rounded-full h-10 w-10 object-cover border-2 border-blue-200 transition-transform duration-300 hover:scale-110"
                src={user.avatar}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/profile.png";
                }}
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-slate-700 hover:underline transition-colors duration-300"
            >
              Sign in
            </Link>
          )}
        </div>
        {/* ...existing code... */}
      </div>
    </header>
    // ...existing code...
  );
};

export default Header;
