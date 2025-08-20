import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image,
  X,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Car,
  Sofa,
  Tag,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CreateListing() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    status: "rent",
    sell: false,
    rent: true,
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });

  // ... existing functions (handleImageSubmit, storeImage, handleRemoveImage, handleChange, handleSubmit) ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] py-8 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/8 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-[#2eb6f5]/6 rounded-full animate-float animation-delay-2000 blur-md"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2eb6f5]/10 rounded-full mb-4">
            <Home className="w-8 h-8 text-[#2eb6f5]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Create Your <span className="text-[#2eb6f5]">Listing</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your property with thousands of potential buyers and renters
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#2eb6f5]/20 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2eb6f5]/10 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-[#2eb6f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Beautiful 2BHK Apartment"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property features, amenities, and highlights..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm resize-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Property Type Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2eb6f5]/10 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-[#2eb6f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Property Type
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    name="sell"
                    checked={formData.sell}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.sell
                        ? "border-[#2eb6f5] bg-[#2eb6f5]/10"
                        : "border-gray-300 bg-white/50 hover:border-[#2eb6f5]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-[#2eb6f5]" />
                      <span className="font-medium">For Sale</span>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    name="rent"
                    checked={formData.rent}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.rent
                        ? "border-[#2eb6f5] bg-[#2eb6f5]/10"
                        : "border-gray-300 bg-white/50 hover:border-[#2eb6f5]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-[#2eb6f5]" />
                      <span className="font-medium">For Rent</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2eb6f5]/10 rounded-lg flex items-center justify-center">
                  <Bed className="w-5 h-5 text-[#2eb6f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Property Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bed className="w-4 h-4 inline mr-1" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    min="1"
                    max="10"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bath className="w-4 h-4 inline mr-1" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    min="1"
                    max="10"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amenities
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="parking"
                      checked={formData.parking}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.parking
                          ? "border-[#2eb6f5] bg-[#2eb6f5]/10"
                          : "border-gray-300 bg-white/50 hover:border-[#2eb6f5]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#2eb6f5]" />
                        <span className="text-sm font-medium">Parking</span>
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="furnished"
                      checked={formData.furnished}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.furnished
                          ? "border-[#2eb6f5] bg-[#2eb6f5]/10"
                          : "border-gray-300 bg-white/50 hover:border-[#2eb6f5]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sofa className="w-4 h-4 text-[#2eb6f5]" />
                        <span className="text-sm font-medium">Furnished</span>
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="offer"
                      checked={formData.offer}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.offer
                          ? "border-[#2eb6f5] bg-[#2eb6f5]/10"
                          : "border-gray-300 bg-white/50 hover:border-[#2eb6f5]/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#2eb6f5]" />
                        <span className="text-sm font-medium">
                          Special Offer
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2eb6f5]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#2eb6f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Pricing</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Regular Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Price * {formData.rent ? "(₹/Month)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    name="regularPrice"
                    min="50"
                    max="10000000"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>

                {/* Discount Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Price {formData.rent ? "(₹/Month)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    min="0"
                    max="10000000"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2eb6f5] focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2eb6f5]/10 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-[#2eb6f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Property Images
                </h3>
              </div>

              {/* File Input */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#2eb6f5] transition-colors duration-200">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-[#2eb6f5] hover:text-[#1e90ff] font-medium"
                >
                  Click to upload images
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Upload up to 6 images (max 2MB each)
                </p>

                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading || !files.length}
                  className="mt-4 px-6 py-2 bg-[#2eb6f5] text-white rounded-xl hover:bg-[#1e90ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
              </div>

              {/* Error Display */}
              {imageUploadError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{imageUploadError}</p>
                </div>
              )}

              {/* Image Preview */}
              {formData.imageUrls.length > 0 && (
                <div className="space-y-4">
                  <p className="font-medium text-gray-700">
                    Uploaded Images ({formData.imageUrls.length}/6)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={url} className="relative group">
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full py-4 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Listing...
                  </div>
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
