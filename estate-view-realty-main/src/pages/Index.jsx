import { useState, useEffect, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/listing")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Memoize filtered properties to prevent unnecessary re-calculations
  const filteredProperties = useMemo(() => {
    if (!filters) return properties;

    return properties.filter((property) => {
      if (filters.status && property.status !== filters.status) return false;
      if (filters.type && property.type.toLowerCase() !== filters.type)
        return false;
      if (
        filters.bedrooms?.length > 0 &&
        !filters.bedrooms.includes(property.bedrooms)
      )
        return false;
      if (
        filters.bathrooms &&
        property.bathrooms.toString() !== filters.bathrooms
      )
        return false;
      if (filters.minPrice && property.regularPrice < Number(filters.minPrice))
        return false;
      if (filters.maxPrice && property.regularPrice > Number(filters.maxPrice))
        return false;
      if (
        filters.furnished !== null &&
        property.furnished !== filters.furnished
      )
        return false;
      if (filters.parking !== null && property.parking !== filters.parking)
        return false;
      if (filters.offer !== null && property.offer !== filters.offer)
        return false;
      return true;
    });
  }, [properties, filters]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Optimized Background Elements - Reduced quantity and improved performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating circles - Reduced from 11 to 6 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#2eb6f5]/8 rounded-full animate-float blur-sm will-change-transform"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#2eb6f5]/12 rounded-full animate-float animation-delay-2000 blur-sm will-change-transform"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-[#2eb6f5]/6 rounded-full animate-float animation-delay-4000 blur-md will-change-transform"></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-[#2eb6f5]/10 rounded-full animate-float animation-delay-6000 blur-sm will-change-transform"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#2eb6f5]/15 rounded-full animate-float animation-delay-1000 will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-[#2eb6f5]/8 rounded-full animate-float animation-delay-3000 blur-sm will-change-transform"></div>

        {/* Geometric Shapes - Reduced and optimized */}
        <div className="absolute top-32 right-32 w-12 h-12 bg-[#2eb6f5]/12 rotate-45 animate-spin-slow will-change-transform"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-[#2eb6f5]/20 animate-bounce-slow will-change-transform"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-[#2eb6f5]/15 rotate-45 animate-spin-slow animation-delay-4000 will-change-transform"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />

          {/* Properties Section */}
          <section className="py-12 relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Featured <span className="text-[#2eb6f5]">Properties</span>
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
                  <FilterSidebar
                    isOpen={true}
                    onClose={() => {}}
                    onFiltersChange={setFilters}
                  />
                </div>

                {/* Mobile/Tablet Sidebar */}
                <div className="lg:hidden">
                  <FilterSidebar
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onFiltersChange={setFilters}
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
                    ) : filteredProperties.length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#2eb6f5]/20 animate-fade-in-up">
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No properties found
                          </h3>
                          <p className="text-gray-500 mb-4">
                            Try adjusting your filters or create a new listing!
                          </p>
                          <Button className="bg-[#2eb6f5] hover:bg-[#1e90ff] text-white">
                            Create Listing
                          </Button>
                        </div>
                      </div>
                    ) : (
                      filteredProperties.map((property, index) => (
                        <div
                          key={property._id}
                          className="animate-fade-in-up will-change-transform"
                          style={{
                            animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
                            animationFillMode: "both",
                          }}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Load More Button */}
                  {filteredProperties.length > 0 && (
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

      {/* Optimized CSS Animations */}
      <style>{`
        /* Use transform3d for hardware acceleration */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translate3d(-30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(10px, -20px, 0);
          }
          50% {
            transform: translate3d(-5px, -10px, 0);
          }
          75% {
            transform: translate3d(8px, -15px, 0);
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
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -15px, 0) scale(1.05);
          }
        }

        /* Optimized animation classes */
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }

        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }

        /* Reduced animation delays for faster initial load */
        .animation-delay-1000 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 1s; }
        .animation-delay-3000 { animation-delay: 1.5s; }
        .animation-delay-4000 { animation-delay: 2s; }
        .animation-delay-6000 { animation-delay: 2.5s; }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-spin-slow,
          .animate-bounce-slow {
            animation: none;
          }

          .animate-fade-in-up,
          .animate-slide-in-left {
            animation-duration: 0.2s;
          }
        }

        /* GPU acceleration for smoother animations */
        .animate-float,
        .animate-spin-slow,
        .animate-bounce-slow,
        .animate-fade-in-up,
        .animate-slide-in-left {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Index;
