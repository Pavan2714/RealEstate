import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setFavoriteProperties([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_URL}/api/listing`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => favoriteIds.includes(p._id));
        setFavoriteProperties(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [favoriteIds]);

  // Remove from favorites
  const handleToggleFavorite = (listingId) => {
    const updated = favoriteIds.includes(listingId)
      ? favoriteIds.filter((id) => id !== listingId)
      : [...favoriteIds, listingId];
    setFavoriteIds(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
      {loading ? (
        <div className="text-center py-16 text-gray-500">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2eb6f5] mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading favorites...</p>
          </div>
        </div>
      ) : favoriteProperties.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
