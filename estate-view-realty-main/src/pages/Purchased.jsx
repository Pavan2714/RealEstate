import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Purchased = () => {
  const user = useSelector((state) => state.user.user);
  const [buyings, setBuyings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // Fetch both buying and rental offers
    Promise.all([
      fetch(`${API_URL}/api/buying?buyerId=${user._id}`).then((res) =>
        res.json()
      ),
      fetch(`${API_URL}/api/rental?renterId=${user._id}`).then((res) =>
        res.json()
      ),
    ])
      .then(([buyingData, rentalData]) => {
        setBuyings(buyingData || []);
        setRentals(rentalData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [user]);

  // Remove offer handler
  const handleRemoveOffer = async (offerId, type) => {
    const endpoint =
      type === "Buy" ? `${API_URL}/api/buying` : `${API_URL}/api/rental`;
    try {
      const res = await fetch(`${endpoint}/${offerId}`, { method: "DELETE" });
      if (res.ok) {
        if (type === "Buy") {
          setBuyings((prev) => prev.filter((offer) => offer._id !== offerId));
        } else {
          setRentals((prev) => prev.filter((offer) => offer._id !== offerId));
        }
      } else {
        alert("Failed to remove offer.");
      }
    } catch (error) {
      alert("Error removing offer.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to view your purchased properties.
        </p>
      </div>
    );
  }

  const renderOfferCard = (offer, type) => (
    <div key={offer._id} className="relative border rounded-lg p-4 shadow-md">
      {offer.listingId && <PropertyCard property={offer.listingId} />}

      {/* Status Badge */}
      <Badge
        className={`absolute top-2 right-2 ${
          offer.status === "pending"
            ? "bg-yellow-500"
            : offer.status === "confirmed"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {offer.status}
      </Badge>

      {/* Offer Details */}
      <div className="mt-4 p-3 bg-muted rounded">
        <p className="text-sm font-medium">Your {type} Offer:</p>
        <p className="text-sm">
          Offer Price: ₹{offer.offerPrice?.toLocaleString()}
        </p>
        {offer.duration && type === "Rental" && (
          <p className="text-sm">Duration: {offer.duration} months</p>
        )}
        <p className="text-xs text-muted-foreground">
          Offered on: {new Date(offer.createdAt).toLocaleDateString()}
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="mt-2"
          onClick={() => handleRemoveOffer(offer._id, type)}
        >
          Remove Offer
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            My Offers & Purchases
          </h2>
          <p className="text-muted-foreground">
            Track all your property offers and purchases
          </p>
        </div>

        <Tabs defaultValue="buying" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buying">Buying ({buyings.length})</TabsTrigger>
            <TabsTrigger value="rental">Rental ({rentals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="buying" className="mt-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            ) : buyings.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No buying offers yet. Browse properties for sale!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {buyings.map((buying) => renderOfferCard(buying, "Buy"))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rental" className="mt-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            ) : rentals.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No rental offers yet. Browse properties for rent!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rentals.map((rental) => renderOfferCard(rental, "Rental"))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Purchased;
