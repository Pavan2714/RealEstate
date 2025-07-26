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

        const response = await fetch(`/api/listing/${id}`);

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
          {/* Debug Info - Remove in production */}
          <div className="mb-4 p-2 bg-yellow-100 rounded text-xs">
            <strong>Debug:</strong> Property ID: {id} | Name: {property.name} |
            Images: {property.imageUrls?.length || 0}
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-6 border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#2eb6f5]/20 animate-fade-in-up">
                <div className="relative mb-4">
                  {currentImageSrc ? (
                    <img
                      src={currentImageSrc}
                      alt={property.name || "Property Image"}
                      className="w-full h-96 object-cover rounded-xl"
                      onError={() =>
                        handleImageError(
                          property.imageUrls?.[currentImageIndex],
                          currentImageIndex
                        )
                      }
                    />
                  ) : (
                    <ImagePlaceholder className="w-full h-96 rounded-xl" />
                  )}

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm text-gray-600 hover:text-[#2eb6f5]"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Property Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.status && (
                      <Badge
                        className={`${
                          property.status === "sell"
                            ? "bg-green-600"
                            : "bg-blue-600"
                        } text-white font-bold`}
                      >
                        For {property.status === "sell" ? "Sale" : "Rent"}
                      </Badge>
                    )}

                    {property.offer && discountAmount > 0 && (
                      <Badge className="bg-red-500 text-white font-bold animate-pulse">
                        Special Offer
                      </Badge>
                    )}

                    {property.type && (
                      <Badge className="bg-[#2eb6f5] text-white font-bold capitalize">
                        {property.type}
                      </Badge>
                    )}
                  </div>

                  {/* Property Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#2eb6f5] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    ₹{property.regularPrice?.toLocaleString() || "N/A"}
                    {property.status === "rent" && (
                      <span className="text-xs font-normal ml-1">/month</span>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                {property.imageUrls && property.imageUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {property.imageUrls.map((url, index) => {
                      const thumbnailSrc = getImageSrc(url, index);
                      return (
                        <div
                          key={index}
                          className={`h-20 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                            currentImageIndex === index
                              ? "ring-2 ring-[#2eb6f5] scale-105"
                              : "hover:opacity-80"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          {thumbnailSrc ? (
                            <img
                              src={thumbnailSrc}
                              alt={`${property.name} ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                              onError={() => handleImageError(url, index)}
                            />
                          ) : (
                            <ImagePlaceholder className="w-full h-full rounded-lg" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#2eb6f5]/20 mt-6 animate-fade-in-up animation-delay-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Property Details
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-[#2eb6f5]/5 rounded-lg">
                    <Bed className="h-5 w-5 text-[#2eb6f5]" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {property.bedrooms || "N/A"}
                      </span>
                      <p className="text-xs text-gray-600">Bedrooms</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-[#2eb6f5]/5 rounded-lg">
                    <Bath className="h-5 w-5 text-[#2eb6f5]" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {property.bathrooms || "N/A"}
                      </span>
                      <p className="text-xs text-gray-600">Bathrooms</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-[#2eb6f5]/5 rounded-lg">
                    <Car className="h-5 w-5 text-[#2eb6f5]" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {property.parking ? "Yes" : "No"}
                      </span>
                      <p className="text-xs text-gray-600">Parking</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-[#2eb6f5]/5 rounded-lg">
                    <Home className="h-5 w-5 text-[#2eb6f5]" />
                    <div>
                      <span className="font-medium text-gray-900">
                        {property.furnished ? "Yes" : "No"}
                      </span>
                      <p className="text-xs text-gray-600">Furnished</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || "No description available."}
                  </p>
                </div>

                {/* Property Features */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.furnished && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5]"
                      >
                        Furnished
                      </Badge>
                    )}
                    {property.parking && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5]"
                      >
                        Parking Available
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="border-[#2eb6f5]/30 text-[#2eb6f5]"
                    >
                      {property.bedrooms || 0} Bed / {property.bathrooms || 0}{" "}
                      Bath
                    </Badge>
                    {property.type && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] capitalize"
                      >
                        {property.type}
                      </Badge>
                    )}
                    {property.status && (
                      <Badge
                        variant="outline"
                        className="border-[#2eb6f5]/30 text-[#2eb6f5] capitalize"
                      >
                        For {property.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Property Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#2eb6f5]/20 animate-fade-in-up animation-delay-400 sticky top-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {property.name || "Property Name"}
                </h1>

                <div className="flex items-center gap-1 text-gray-600 mb-6">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {property.address || "Address not available"}
                  </span>
                </div>

                {/* Price Section */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#2eb6f5]/5 to-[#1e90ff]/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-[#2eb6f5]" />
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{property.regularPrice?.toLocaleString() || "N/A"}
                      {property.status === "rent" && (
                        <span className="text-lg text-gray-600">/month</span>
                      )}
                    </span>
                  </div>

                  {property.offer && discountAmount > 0 && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">
                        <span className="line-through">
                          ₹{property.discountPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-green-600 font-medium">
                        <Shield className="h-4 w-4 inline mr-1" />
                        Save ₹{discountAmount.toLocaleString()}!
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-[#2eb6f5] hover:bg-[#1e90ff] text-white transition-all duration-300 hover:scale-105">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>

                {/* Property Info */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Listed on{" "}
                      {property.createdAt
                        ? new Date(property.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="h-4 w-4" />
                    <span>
                      Property ID:{" "}
                      {property._id?.slice(-8).toUpperCase() || "N/A"}
                    </span>
                  </div>
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
