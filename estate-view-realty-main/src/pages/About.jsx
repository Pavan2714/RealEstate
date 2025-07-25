import {
  Users,
  Award,
  Building,
  Target,
  Heart,
  Shield,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and satisfaction above everything else.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "We believe in honest, transparent dealings with verified property information.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every service we provide to our clients.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "We continuously innovate to make real estate accessible and simple.",
    },
  ];

  const team = [
    {
      name: "Nidhi Patel",
      role: "CEO & Founder",
      experience: "15+ years",
      avatar: "NP",
    },
    {
      name: "Kashish Desai",
      role: "Head of Sales",
      experience: "12+ years",
      avatar: "KD",
    },
    {
      name: "Nency Shah",
      role: "Technology Lead",
      experience: "10+ years",
      avatar: "NS",
    },
    {
      name: "Khushi Suthar",
      role: "Customer Success",
      experience: "8+ years",
      avatar: "KS",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "5,000+", label: "Happy Families" },
    { number: "50+", label: "Cities Covered" },
    { number: "15+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyZWI2ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="text-black">About </span>
                <span className="bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] bg-clip-text text-transparent">
                  Nivaas360
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're on a mission to make real estate simple, transparent, and
                accessible for everyone. With over 15 years of experience, we've
                helped thousands of families find their dream homes.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  Our <span className="text-[#2eb6f5]">Story</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    Founded in 2009, Nivaas360 started as a small real estate
                    consultancy with a simple vision: to make property buying
                    and selling transparent, efficient, and stress-free for
                    everyone.
                  </p>
                  <p
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    What began as a team of three passionate real estate
                    professionals has now grown into one of India's most trusted
                    property platforms, serving over 50 cities and helping
                    thousands of families find their perfect homes.
                  </p>
                  <p
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Today, we leverage cutting-edge technology to provide
                    comprehensive real estate solutions, from property discovery
                    to legal assistance, making us your one-stop destination for
                    all real estate needs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-[#2eb6f5]/10 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-[#2eb6f5] mb-3 animate-pulse">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core <span className="text-[#2eb6f5]">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These values guide everything we do and shape how we serve our
                customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 group animate-fade-in-up border border-[#2eb6f5]/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our <span className="text-[#2eb6f5]">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our experienced team of professionals is here to help you every
                step of the way
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 group animate-slide-in-up border border-[#2eb6f5]/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#2eb6f5] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member.experience} experience
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-[#2eb6f5]/5 to-[#1e90ff]/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="text-center lg:text-left animate-slide-in-left">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To revolutionize the real estate industry by providing
                  transparent, efficient, and customer-centric property
                  solutions that make finding your perfect home a delightful
                  experience.
                </p>
              </div>

              <div className="text-center lg:text-left animate-slide-in-right">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be India's most trusted and innovative real estate
                  platform, where every property transaction is seamless,
                  secure, and satisfying for all parties involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of happy families who found their perfect property
              with us
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#2eb6f5] hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                onClick={() => navigate("/")}
              >
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-[#2eb6f5] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
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
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;
