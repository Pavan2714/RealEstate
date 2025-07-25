import { useSelector } from "react-redux";
import PropertyCard from "@/components/PropertyCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Favorites;
