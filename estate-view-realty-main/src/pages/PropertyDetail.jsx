import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Car,
  Home,
  Calendar,
  DollarSign,
  Heart,
  Share2,
  Phone,
  Mail,
  Shield,
  Eye,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching property with ID:", id);

        const response = await fetch(`${API_URL}/api/listing/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Property not found");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 🔍 ADD THESE DEBUG LOGS
        console.log("Raw response:", data);
        console.log("Response type:", typeof data);
        console.log("Response keys:", Object.keys(data || {}));
        console.log("Property data structure:", JSON.stringify(data, null, 2));

        // Handle both wrapped and direct responses
        const propertyData = data.success ? data.data : data;
        console.log("Final property data:", propertyData);

        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError(error.message);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== "undefined") {
      fetchProperty();
    } else {
      setError("Invalid property ID");
      setLoading(false);
    }
  }, [id]);

  // Better image handling with fallback
  const getImageSrc = (imageUrl, index = 0) => {
    const imageKey = `${imageUrl}-${index}`;

    if (!imageUrl || failedImages.has(imageKey)) {
      return null; // Return null instead of broken image path
    }

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("data:")) {
      return imageUrl;
    }

    return `data:image/jpeg;base64,${imageUrl}`;
  };

  const handleImageError = (imageUrl, index = 0) => {
    const imageKey = `${imageUrl}-${index}`;
    console.log("Image failed to load:", imageKey);
    setFailedImages((prev) => new Set([...prev, imageKey]));
  };

  // Create a placeholder component
  const ImagePlaceholder = ({ className }) => (
    <div
      className={`${className} bg-gray-200 flex items-center justify-center`}
    >
      <ImageIcon className="h-16 w-16 text-gray-400" />
    </div>
  );

  // Calculate discount if offer exists
  const getDiscountAmount = () => {
    if (
      property?.offer &&
      property?.discountPrice &&
      property?.regularPrice &&
      property.discountPrice < property.regularPrice
    ) {
      return property.regularPrice - property.discountPrice;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-3000 blur-md"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2eb6f5] mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">
              Loading property details...
            </p>
            <p className="text-sm text-gray-500 mt-2">Property ID: {id}</p>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-15px) translateX(8px); }
            50% { transform: translateY(-8px) translateX(-5px); }
            75% { transform: translateY(-12px) translateX(6px); }
          }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .animation-delay-3000 { animation-delay: 3s; }
        `}</style>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              {error ||
                "The property you're looking for doesn't exist or has been removed."}
            </p>
            <p className="text-sm text-gray-500 mb-6">Property ID: {id}</p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-[#2eb6f5] hover:bg-[#1e90ff] text-white"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const discountAmount = getDiscountAmount();
  const currentImageSrc = getImageSrc(
    property.imageUrls?.[currentImageIndex],
    currentImageIndex
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-2000 blur-sm"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-4000 blur-md"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-6000 blur-sm"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="animate-fade-in-up mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-[#2eb6f5]/20 animate-fade-in-up hover:shadow-2xl transition-all duration-500">
                <div className="relative mb-6 group">
                  {currentImageSrc ? (
                    <img
                      src={currentImageSrc}
                      alt={property.name || "Property Image"}
                      className="w-full h-80 sm:h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={() =>
                        handleImageError(
                          property.imageUrls?.[currentImageIndex],
                          currentImageIndex
                        )
                      }
                    />
                  ) : (
                    <ImagePlaceholder className="w-full h-80 sm:h-96 rounded-2xl" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50 border-0 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 backdrop-blur-sm text-gray-600 hover:text-[#2eb6f5] hover:bg-[#2eb6f5]/10 border-0 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Property Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-3">
                    {property.status && (
                      <Badge
                        className={`px-3 py-1.5 font-bold shadow-lg backdrop-blur-sm ${
                          property.status === "sell"
                            ? "bg-green-600/90 hover:bg-green-700"
                            : "bg-blue-600/90 hover:bg-blue-700"
                        } text-white transition-all duration-300 hover:scale-105`}
                      >
                        For {property.status === "sell" ? "Sale" : "Rent"}
                      </Badge>
                    )}

                    {property.offer && discountAmount > 0 && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg animate-pulse px-3 py-1.5 hover:scale-105 transition-transform">
                        🔥 Special Offer
                      </Badge>
                    )}

                    {property.type && (
                      <Badge className="bg-[#2eb6f5]/90 backdrop-blur-sm text-white font-bold capitalize shadow-lg px-3 py-1.5 hover:bg-[#1e90ff] hover:scale-105 transition-all duration-300">
                        {property.type}
                      </Badge>
                    )}
                  </div>

                  {/* Property Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white px-6 py-3 rounded-2xl font-bold shadow-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      <span className="text-lg">
                        ₹{property.regularPrice?.toLocaleString() || "N/A"}
                        {property.status === "rent" && (
                          <span className="text-sm font-normal ml-1 opacity-90">/month</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Image Counter */}
                  {property.imageUrls && property.imageUrls.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-sm font-medium">
                      {currentImageIndex + 1} / {property.imageUrls.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {property.imageUrls && property.imageUrls.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {property.imageUrls.map((url, index) => {
                      const thumbnailSrc = getImageSrc(url, index);
                      return (
                        <div
                          key={index}
                          className={`relative h-16 sm:h-20 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden group ${
                            currentImageIndex === index
                              ? "ring-3 ring-[#2eb6f5] shadow-lg scale-105"
                              : "hover:opacity-80 hover:scale-105 hover:shadow-md"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          {thumbnailSrc ? (
                            <img
                              src={thumbnailSrc}
                              alt={`${property.name} ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={() => handleImageError(url, index)}
                            />
                          ) : (
                            <ImagePlaceholder className="w-full h-full bg-gray-100" />
                          )}
                          
                          {/* Overlay for current image */}
                          {currentImageIndex === index && (
                            <div className="absolute inset-0 bg-[#2eb6f5]/20 flex items-center justify-center">
                              <Eye className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Property Details Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#2eb6f5]/20 animate-fade-in-up animation-delay-200 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] rounded-2xl flex items-center justify-center">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Property Details
                  </h2>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="group p-4 bg-gradient-to-r from-[#2eb6f5]/5 to-[#1e90ff]/5 rounded-2xl border border-[#2eb6f5]/10 hover:border-[#2eb6f5]/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2eb6f5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2eb6f5]/20 transition-colors">
                        <Bed className="h-5 w-5 text-[#2eb6f5]" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {property.bedrooms || "N/A"}
                        </span>
                        <p className="text-xs text-gray-600 font-medium">Bedrooms</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-gradient-to-r from-[#2eb6f5]/5 to-[#1e90ff]/5 rounded-2xl border border-[#2eb6f5]/10 hover:border-[#2eb6f5]/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2eb6f5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2eb6f5]/20 transition-colors">
                        <Bath className="h-5 w-5 text-[#2eb6f5]" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {property.bathrooms || "N/A"}
                        </span>
                        <p className="text-xs text-gray-600 font-medium">Bathrooms</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-gradient-to-r from-[#2eb6f5]/5 to-[#1e90ff]/5 rounded-2xl border border-[#2eb6f5]/10 hover:border-[#2eb6f5]/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2eb6f5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2eb6f5]/20 transition-colors">
                        <Car className="h-5 w-5 text-[#2eb6f5]" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {property.parking ? "Yes" : "No"}
                        </span>
                        <p className="text-xs text-gray-600 font-medium">Parking</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-gradient-to-r from-[#2eb6f5]/5 to-[#1e90ff]/5 rounded-2xl border border-[#2eb6f5]/10 hover:border-[#2eb6f5]/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2eb6f5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2eb6f5]/20 transition-colors">
                        <Home className="h-5 w-5 text-[#2eb6f5]" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {property.furnished ? "Yes" : "No"}
                        </span>
                        <p className="text-xs text-gray-600 font-medium">Furnished</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#2eb6f5]/20 rounded-lg flex items-center justify-center">
                      <span className="w-2 h-2 bg-[#2eb6f5] rounded-full"></span>
                    </div>
                    Description
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {property.description || "No description available."}
                    </p>
                  </div>
                </div>

                {/* Property Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#2eb6f5]/20 rounded-lg flex items-center justify-center">
                      <span className="w-2 h-2 bg-[#2eb6f5] rounded-full"></span>
                    </div>
                    Features & Amenities
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {property.furnished && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] bg-[#2eb6f5]/5 hover:bg-[#2eb6f5]/10 px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                      >
                        ✨ Furnished
                      </Badge>
                    )}
                    {property.parking && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] bg-[#2eb6f5]/5 hover:bg-[#2eb6f5]/10 px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                      >
                        🚗 Parking Available
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="border-[#2eb6f5]/30 text-[#2eb6f5] bg-[#2eb6f5]/5 hover:bg-[#2eb6f5]/10 px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                    >
                      🏠 {property.bedrooms || 0} Bed / {property.bathrooms || 0} Bath
                    </Badge>
                    {property.type && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] bg-[#2eb6f5]/5 hover:bg-[#2eb6f5]/10 px-4 py-2 font-medium capitalize transition-all duration-300 hover:scale-105"
                      >
                        🏘️ {property.type}
                      </Badge>
                    )}
                    {property.status && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] bg-[#2eb6f5]/5 hover:bg-[#2eb6f5]/10 px-4 py-2 font-medium capitalize transition-all duration-300 hover:scale-105"
                      >
                        📋 For {property.status}
                      </Badge>
                    )}
                    {property.offer && (
                      <Badge
                        variant="outline"
                        className="border-red-300 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                      >
                        🔥 Special Offer
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Property Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#2eb6f5]/20 animate-fade-in-up animation-delay-400 sticky top-4 hover:shadow-2xl transition-all duration-500">
                {/* Property Title */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {property.name || "Property Name"}
                  </h1>

                  <div className="flex items-start gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl">
                    <MapPin className="h-5 w-5 mt-0.5 text-[#2eb6f5] flex-shrink-0" />
                    <span className="text-sm font-medium leading-relaxed">
                      {property.address || "Address not available"}
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-[#2eb6f5]/10 via-[#1e90ff]/10 to-[#2eb6f5]/10 rounded-2xl border border-[#2eb6f5]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] rounded-xl flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Property Price</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{property.regularPrice?.toLocaleString() || "N/A"}
                        </span>
                        {property.status === "rent" && (
                          <span className="text-lg text-gray-600 font-medium">/month</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {property.offer && discountAmount > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 font-semibold text-sm">Special Discount</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm line-through">
                          ₹{property.discountPrice?.toLocaleString()}
                        </span>
                        <span className="text-green-600 font-bold">
                          Save ₹{discountAmount.toLocaleString()}!
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                  <Button className="w-full bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2eb6f5] text-white font-semibold py-4 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                    <Phone className="h-5 w-5 mr-3" />
                    Contact Agent Now
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white font-semibold py-4 transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    Send Message
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 font-semibold py-4 transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="h-5 w-5 mr-3" />
                    Schedule Viewing
                  </Button>
                </div>

                {/* Property Meta Info */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-[#2eb6f5]" />
                      <span className="font-medium text-gray-700">Listed Date</span>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {property.createdAt
                        ? new Date(property.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-[#2eb6f5]" />
                      <span className="font-medium text-gray-700">Property ID</span>
                    </div>
                    <span className="text-gray-600 font-mono text-sm">
                      #{property._id?.slice(-8).toUpperCase() || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-[#2eb6f5]" />
                      <span className="font-medium text-gray-700">Property Type</span>
                    </div>
                    <span className="text-gray-600 font-medium capitalize">
                      {property.type || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Verified Property</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    This property has been verified by our team for authenticity and accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
};

export default PropertyDetail;
