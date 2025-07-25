import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Car,
  Home,
  Play,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-home.jpg";

const API_URL = "/api/listing";

const HeroSection = () => {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const isValidSearch = address || type || budget;

  const stats = [
    {
      number: "10K+",
      label: "Properties",
      icon: Home,
      color: "from-[#2eb6f5] to-blue-500",
    },
    {
      number: "5K+",
      label: "Happy Clients",
      icon: Award,
      color: "from-green-400 to-emerald-500",
    },
    {
      number: "50+",
      label: "Cities",
      icon: TrendingUp,
      color: "from-purple-400 to-pink-500",
    },
  ];

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    setError("");
    setIsLoading(true);

    if (!isValidSearch) {
      setFilteredListings([]);
      setError("Please enter at least one filter option.");
      setIsLoading(false);
      return;
    }

    const params = new URLSearchParams();
    if (address) params.append("address", address);
    if (type) params.append("type", type);

    if (budget === "0-10") {
      params.append("minPrice", 0);
      params.append("maxPrice", 1000000);
    } else if (budget === "10-25") {
      params.append("minPrice", 1000000);
      params.append("maxPrice", 2500000);
    } else if (budget === "25-50") {
      params.append("minPrice", 2500001);
      params.append("maxPrice", 5000000);
    } else if (budget === "50-1cr") {
      params.append("minPrice", 5000001);
      params.append("maxPrice", 10000000);
    } else if (budget === "1cr+") {
      params.append("minPrice", 10000001);
    }

    try {
      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data = await res.json();
      setFilteredListings(data);
      if (data.length === 0) setError("No properties found for this search.");
    } catch (err) {
      setFilteredListings([]);
      setError("Failed to fetch listings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#2eb6f5]/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#2eb6f5]/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-4000"></div>
        <div className="absolute bottom-20 right-16 w-12 h-12 bg-[#2eb6f5]/25 rounded-full animate-float animation-delay-6000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-8 h-8 bg-[#2eb6f5]/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-[#2eb6f5]/30 rounded-full animate-bounce-slow"></div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2eb6f5]/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Hero Title with Enhanced Animation */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your
              <span className="block text-[#2eb6f5] bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] bg-clip-text text-transparent animate-pulse">
                Dream Home
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the perfect property from our extensive collection of
              <span className="text-[#2eb6f5] font-semibold"> premium </span>
              homes, apartments, and commercial spaces.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#2eb6f5]" />
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#2eb6f5]" />
                <span>Trusted Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#2eb6f5]" />
                <span>Best Prices</span>
              </div>
            </div>
          </div>

          {/* Enhanced Search Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#2eb6f5]/20 p-8 md:p-10 max-w-5xl mx-auto mb-12 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="relative group">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-[#2eb6f5] group-hover:scale-110 transition-transform" />
                <Input
                  placeholder="Enter location"
                  className="pl-12 h-14 border-2 border-gray-200 hover:border-[#2eb6f5]/50 focus:border-[#2eb6f5] rounded-xl text-lg transition-all duration-300"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-14 border-2 border-gray-200 hover:border-[#2eb6f5]/50 focus:border-[#2eb6f5] rounded-xl text-lg transition-all duration-300">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="h-14 border-2 border-gray-200 hover:border-[#2eb6f5]/50 focus:border-[#2eb6f5] rounded-xl text-lg transition-all duration-300">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10">₹0 - ₹10L</SelectItem>
                  <SelectItem value="10-25">₹10L - ₹25L</SelectItem>
                  <SelectItem value="25-50">₹25L - ₹50L</SelectItem>
                  <SelectItem value="50-1cr">₹50L - ₹1Cr</SelectItem>
                  <SelectItem value="1cr+">₹1Cr+</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="h-14 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2eb6f5] text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Search className="h-5 w-5 mr-2" />
                )}
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Enhanced Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-sm text-gray-500 mr-3 font-medium">
                Popular Searches:
              </span>
              {[
                { label: "For Rent", value: "rent", icon: Home },
                { label: "For Sale", value: "sale", icon: TrendingUp },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 hover:scale-105"
                  onClick={() => setType(filter.value)}
                >
                  <filter.icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-6 p-4 bg-red-50 rounded-xl border border-red-200 animate-shake">
                {error}
              </div>
            )}
          </div>

          {/* Enhanced Listings Results */}
          {filteredListings.length > 0 && (
            <div className="mt-16 w-full max-w-7xl mx-auto animate-fade-in-up">
              <h2 className="text-3xl font-bold text-left mb-8 text-gray-900">
                Search Results
                <span className="text-[#2eb6f5] ml-2">
                  ({filteredListings.length} properties found)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map((listing, index) => (
                  <Card
                    key={listing._id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-xl animate-slide-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group">
                        {listing.imageUrls && listing.imageUrls.length > 0 ? (
                          <img
                            src={listing.imageUrls[0]}
                            alt={listing.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2eb6f5]/10 to-[#2eb6f5]/20">
                            <Home className="h-16 w-16 text-[#2eb6f5]" />
                          </div>
                        )}

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button className="bg-white/90 text-[#2eb6f5] hover:bg-white">
                            <Play className="h-4 w-4 mr-2" />
                            View Tour
                          </Button>
                        </div>

                        <Badge
                          className={`absolute top-4 right-4 ${
                            listing.type === "rent"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : "bg-gradient-to-r from-green-500 to-green-600"
                          } shadow-lg`}
                        >
                          {listing.type === "rent" ? "For Rent" : "For Sale"}
                        </Badge>

                        {listing.offer && (
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 shadow-lg animate-pulse">
                            Special Offer
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-1 text-gray-900">
                        {listing.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-[#2eb6f5]" />
                        {listing.address}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1 text-[#2eb6f5]" />
                          {listing.bedrooms} bed
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 text-[#2eb6f5]" />
                          {listing.bathrooms} bath
                        </div>
                        {listing.parking && (
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1 text-[#2eb6f5]" />
                            Parking
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {listing.description}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-[#2eb6f5]">
                          ₹{listing.regularPrice?.toLocaleString()}
                        </div>
                        {listing.offer && listing.discountPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{listing.discountPrice?.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#2eb6f5] hover:bg-[#1e90ff] text-white hover:scale-105 transition-all duration-300"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Animated Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-500 hover:scale-110 ${
                  index === currentStatIndex
                    ? "bg-white shadow-xl scale-105"
                    : "hover:bg-white/50"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#2eb6f5] mb-2 animate-pulse">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
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
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
