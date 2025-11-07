import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property._id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(property._id);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(property._id);
  };

  // Helper to get the correct image src
  const getImageSrc = () => {
    if (!property.imageUrls || property.imageUrls.length === 0) {
      return "/placeholder.jpg";
    }

    const imageUrl = property.imageUrls[0];

    // Handle external URLs
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Handle base64 images from your backend
    return imageUrl.startsWith("data:")
      ? imageUrl
      : `data:image/jpeg;base64,${imageUrl}`;
  };

  // Calculate discount amount
  const getDiscountAmount = () => {
    if (
      property.offer &&
      property.discountPrice &&
      property.discountPrice < property.regularPrice
    ) {
      return property.regularPrice - property.discountPrice;
    }
    return 0;
  };

  const discountAmount = getDiscountAmount();

  return (
    <div
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#2eb6f5]/20 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer will-change-transform"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getImageSrc()}
          alt={property.name || "Property"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
          loading="lazy"
        />
        {/* Simplified Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* Favorite Button - Optimized */}
        <button
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md transition-transform duration-200 hover:scale-110 z-10 will-change-transform"
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
          />
        </button>
        {/* Optimized Hover Overlay
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleViewDetails}
            size="sm"
            className="bg-[#2eb6f5] hover:bg-[#1e90ff] text-white transition-colors duration-200 shadow-md"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div> */}
        Status Badge
        {property.status && (
          <Badge
            className={`absolute top-4 left-4 ${
              property.status === "sell" ? "bg-green-600" : "bg-blue-600"
            } text-white font-bold shadow-md`}
          >
            For {property.status === "sell" ? "Sale" : "Rent"}
          </Badge>
        )}
        {/* Price Badge */}
        <span className="absolute bottom-4 left-4 bg-[#2eb6f5] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md backdrop-blur-sm">
          ₹{property.regularPrice?.toLocaleString()}
          {property.status === "rent" && (
            <span className="text-xs font-normal ml-1">/month</span>
          )}
        </span>
        {/* Offer Badge - Removed animate-pulse for performance */}
        {property.offer && discountAmount > 0 && (
          <Badge className="absolute top-14 left-4 bg-red-500 text-white font-bold shadow-md">
            Save ₹{discountAmount.toLocaleString()}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2 group-hover:text-[#2eb6f5] transition-colors duration-300">
          {property.name}
          {property.offer && (
            <Badge className="bg-yellow-400 text-black font-bold">Offer</Badge>
          )}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1 text-[#2eb6f5]" />
          <span className="truncate">{property.address}</span>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center gap-4 text-sm font-medium mb-3">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-[#2eb6f5]" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-[#2eb6f5]" /> {property.bathrooms}
          </span>
          {property.area && (
            <span className="flex items-center gap-1">
              <Square className="w-4 h-4 text-[#2eb6f5]" /> {property.area}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {property.parking && (
            <Badge
              variant="outline"
              className="text-blue-700 border-blue-200 text-xs"
            >
              Parking
            </Badge>
          )}
          {property.furnished && (
            <Badge
              variant="outline"
              className="text-pink-700 border-pink-200 text-xs"
            >
              Furnished
            </Badge>
          )}
          {property.type && (
            <Badge
              variant="outline"
              className="text-gray-700 border-gray-200 text-xs capitalize"
            >
              {property.type}
            </Badge>
          )}
        </div>

        {/* Simplified Discount Display */}
        {property.offer && discountAmount > 0 && (
          <div className="text-green-600 font-semibold text-sm">
            Save ₹{discountAmount.toLocaleString()}!
          </div>
        )}
      </div>

      {/* Simplified Decorative Glow */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#2eb6f5] opacity-10 rounded-full blur-xl pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>
    </div>
  );
};

export default PropertyCard;
