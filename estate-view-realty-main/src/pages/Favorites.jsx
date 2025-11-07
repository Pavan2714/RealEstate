import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";

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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe]">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My <span className="text-[#2eb6f5]">Favorites</span>
          </h1>
          <p className="text-gray-600">
            Properties you've saved for later viewing
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 animate-pulse">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2eb6f5] mx-auto mb-4"></div>
              <p className="text-lg font-medium">Loading favorites...</p>
            </div>
          </div>
        ) : favoriteProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-[#2eb6f5]/20">
              <div className="text-6xl mb-4">💙</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Favorites Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start exploring properties and add them to your favorites!
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Browse Properties
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {favoriteProperties.length}{" "}
              {favoriteProperties.length === 1 ? "property" : "properties"}{" "}
              saved
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
