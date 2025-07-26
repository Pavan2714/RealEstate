import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Mumbai",
    rating: 5,
    text: "Found my dream apartment through RealEstate. The platform is so easy to use and the property details were accurate. Highly recommend!",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Raj Patel",
    role: "Business Owner",
    location: "Bangalore",
    rating: 5,
    text: "Excellent service! The team helped me find the perfect office space for my startup. The entire process was smooth and transparent.",
    avatar: "RP",
  },
  {
    id: 3,
    name: "Anjali Singh",
    role: "Doctor",
    location: "Delhi",
    rating: 5,
    text: "Best real estate platform I've used. The verified properties feature gave me confidence, and I found my home within a week!",
    avatar: "AS",
  },
  {
    id: 4,
    name: "Vikram Kumar",
    role: "Marketing Manager",
    location: "Pune",
    rating: 4,
    text: "Great variety of properties and excellent customer support. The virtual tours saved me a lot of time during my property search.",
    avatar: "VK",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 relative bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2eb6f5]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#2eb6f5]/30 rounded-full blur-2xl animate-float animation-delay-2000"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-[#2eb6f5]">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who found their perfect property with
            us
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#2eb6f5]/20 p-10 md:p-14 text-center relative overflow-hidden animate-slide-in-up transition-all duration-500">
            {/* Decorative Quote Icon */}
            <div className="absolute top-6 left-6 text-[#2eb6f5]/20 animate-pulse">
              <Quote className="h-16 w-16" />
            </div>
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-6 w-6 transition-all duration-300",
                      i < testimonials[currentIndex].rating
                        ? "fill-[#2eb6f5] text-[#2eb6f5] animate-pulse"
                        : "text-gray-300"
                    )}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium italic">
                "{testimonials[currentIndex].text}"
              </blockquote>
              {/* Author */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-[#2eb6f5] font-medium">
                    {testimonials[currentIndex].role} •{" "}
                    {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <div
            className="flex items-center justify-center gap-6 mt-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border-2 border-[#2eb6f5]/30 hover:border-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 group shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "rounded-full transition-all duration-300 hover:scale-125",
                    index === currentIndex
                      ? "bg-[#2eb6f5] w-10 h-3 shadow-lg"
                      : "bg-gray-300 w-3 h-3 hover:bg-[#2eb6f5]/50"
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-12 h-12 rounded-full border-2 border-[#2eb6f5]/30 hover:border-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 group shadow-lg"
            >
              <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#2eb6f5]/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl md:text-3xl font-bold text-[#2eb6f5] mb-2 animate-pulse">
                4.8/5
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Average Rating
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#2eb6f5]/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl md:text-3xl font-bold text-[#2eb6f5] mb-2 animate-pulse">
                2000+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Happy Customers
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#2eb6f5]/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="text-2xl md:text-3xl font-bold text-[#2eb6f5] mb-2 animate-pulse">
                95%
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
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
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
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
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
