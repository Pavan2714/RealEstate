import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setFavoriteProperties([]);
      return;
    }
    // Fetch all properties, then filter by favoriteIds
    fetch(`${API_URL}/api/listing`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => favoriteIds.includes(p._id));
        setFavoriteProperties(filtered);
      });
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
      {favoriteProperties.length === 0 ? (
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
