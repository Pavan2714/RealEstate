import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Buy = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [userBuyings, setUserBuyings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  // Fetch properties for sale
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // Fetch all sale listings
    Promise.all([
      fetch(`${API_URL}/api/listing?type=sale`).then((res) => res.json()),
      fetch(`${API_URL}/api/buying?buyerId=${user._id}`).then((res) =>
        res.json()
      ),
    ])
      .then(([allProperties, buyings]) => {
        // Get all listingIds the user has made an offer on
        const offeredListingIds = new Set(
          buyings.map((b) => b.listingId && b.listingId._id)
        );
        // Filter out properties the user has already made an offer on
        const filtered = allProperties.filter(
          (p) => !offeredListingIds.has(p._id)
        );
        setProperties(filtered);
        setUserBuyings(buyings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Handle Buy Request
  const handleBuy = async (listingId) => {
    const buyerId = user ? user._id : "";
    const offerPrice = 500; // TODO: Make this dynamic with input
    const transactionType = "buy"; // Add this required field
    const duration = null; // Add this field (not required for buy, but expected by controller)

    try {
      const res = await fetch(`${API_URL}/api/buying/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId,
          buyerId,
          offerPrice,
          transactionType,
          duration,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Buying request created successfully!");
        // Optionally remove the property from the list after making an offer
        setProperties((prev) => prev.filter((p) => p._id !== listingId));
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating buying request:", error);
      alert("Something went wrong!");
    }
  };

  if (!user) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] flex items-center justify-center overflow-hidden">
        {/* Background Elements for auth state */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-3000 blur-md"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-5000"></div>
        </div>

        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#2eb6f5]/20 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view available properties for buying.
          </p>
          <Button className="bg-[#2eb6f5] hover:bg-[#1e90ff] text-white">
            Sign In
          </Button>
        </div>

        <style jsx>{`
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
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-15px) translateX(8px);
            }
            50% {
              transform: translateY(-8px) translateX(-5px);
            }
            75% {
              transform: translateY(-12px) translateX(6px);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .animation-delay-5000 {
            animation-delay: 5s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-2000 blur-sm"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-4000 blur-md"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-6000 blur-sm"></div>

        {/* Medium floating circles */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#2eb6f5]/20 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-3000 blur-sm"></div>
        <div className="absolute top-2/3 right-10 w-18 h-18 bg-[#2eb6f5]/18 rounded-full animate-float animation-delay-5000"></div>
        <div className="absolute top-1/4 right-1/2 w-12 h-12 bg-[#2eb6f5]/25 rounded-full animate-float animation-delay-7000"></div>

        {/* Small floating circles */}
        <div className="absolute top-10 right-1/3 w-8 h-8 bg-[#2eb6f5]/30 rounded-full animate-float animation-delay-8000"></div>
        <div className="absolute bottom-10 left-1/3 w-10 h-10 bg-[#2eb6f5]/22 rounded-full animate-float animation-delay-9000"></div>
        <div className="absolute top-1/2 left-20 w-6 h-6 bg-[#2eb6f5]/35 rounded-full animate-float animation-delay-10000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-12 h-12 bg-[#2eb6f5]/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-[#2eb6f5]/25 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-[#2eb6f5]/20 rotate-45 animate-spin-slow animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-[#2eb6f5]/18 animate-bounce-slow animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-4 h-4 bg-[#2eb6f5]/30 rotate-45 animate-spin-slow animation-delay-6000"></div>

        {/* Additional floating elements */}
        <div className="absolute top-60 left-60 w-14 h-14 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-11000 blur-sm"></div>
        <div className="absolute bottom-60 right-60 w-22 h-22 bg-[#2eb6f5]/10 rounded-full animate-float animation-delay-12000 blur-md"></div>
        <div className="absolute top-80 right-80 w-16 h-16 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-13000 blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        <main>
          <HeroSection />

          {/* Properties Section with enhanced styling */}
          <section className="py-12 relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Properties <span className="text-[#2eb6f5]">For Sale</span>
                  </h2>
                  <p className="text-gray-600">
                    Discover our handpicked selection of premium properties
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex gap-6">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block animate-slide-in-left">
                  <FilterSidebar isOpen={true} onClose={() => {}} />
                </div>

                {/* Mobile Sidebar */}
                <div className="lg:hidden">
                  <FilterSidebar
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                  />
                </div>

                {/* Properties Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading ? (
                      <div className="col-span-full text-center text-gray-500 py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 animate-pulse">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2eb6f5] mx-auto mb-4"></div>
                          <p className="text-lg font-medium">
                            Loading properties...
                          </p>
                        </div>
                      </div>
                    ) : properties.length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 animate-fade-in-up">
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No properties found
                          </h3>
                          <p className="text-gray-500 mb-4">
                            Check back later for new listings!
                          </p>
                          <Button className="bg-[#2eb6f5] hover:bg-[#1e90ff] text-white">
                            Browse All Properties
                          </Button>
                        </div>
                      </div>
                    ) : (
                      properties.map((property, index) => (
                        <div
                          key={property._id}
                          className="bg-white/80 backdrop-blur-sm border border-[#2eb6f5]/20 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <PropertyCard property={property} />
                          <Button
                            onClick={() => handleBuy(property._id)}
                            className="mt-4 w-full bg-[#2eb6f5] hover:bg-[#1e90ff] text-white transition-all duration-300 hover:scale-105"
                          >
                            Make an Offer
                          </Button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Load More Button */}
                  {properties.length > 0 && (
                    <div className="text-center mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/80 backdrop-blur-sm border-2 border-[#2eb6f5]/30 text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up"
                      >
                        Load More Properties
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <TestimonialsSection />
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
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
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animation-delay-7000 {
          animation-delay: 7s;
        }
        .animation-delay-8000 {
          animation-delay: 8s;
        }
        .animation-delay-9000 {
          animation-delay: 9s;
        }
        .animation-delay-10000 {
          animation-delay: 10s;
        }
        .animation-delay-11000 {
          animation-delay: 11s;
        }
        .animation-delay-12000 {
          animation-delay: 12s;
        }
        .animation-delay-13000 {
          animation-delay: 13s;
        }
      `}</style>
    </div>
  );
};

export default Buy;
