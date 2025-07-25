import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/contact", formData);
      alert(res.data.message || "Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Mon-Sat 9AM-7PM",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@nivaas360.com", "support@nivaas360.com"],
      description: "24/7 Support",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Business Center", "Mumbai, Maharashtra 400001"],
      description: "Visit us anytime",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Monday - Friday: 9AM - 7PM", "Saturday: 10AM - 5PM"],
      description: "Sunday: Closed",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const offices = [
    {
      city: "Mumbai",
      address: "123 Business Center, Andheri East, Mumbai - 400001",
      phone: "+91 98765 43210",
      email: "mumbai@nivaas360.com",
    },
    {
      city: "Delhi",
      address: "456 Corporate Plaza, Connaught Place, New Delhi - 110001",
      phone: "+91 98765 43211",
      email: "delhi@nivaas360.com",
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Electronic City, Bangalore - 560100",
      phone: "+91 98765 43212",
      email: "bangalore@nivaas360.com",
    },
  ];

  const faqs = [
    {
      question: "What are your service charges?",
      answer:
        "Our service charges vary based on the type of service. Property browsing is free, and we charge a small commission only upon successful transactions.",
    },
    {
      question: "Do you verify all properties?",
      answer:
        "Yes, we have a dedicated verification team that checks all property documents and details before listing them on our platform.",
    },
    {
      question: "Can I schedule property visits?",
      answer:
        "Absolutely! You can schedule property visits through our platform or by contacting our team directly.",
    },
    {
      question: "Do you provide home loan assistance?",
      answer:
        "Yes, we partner with leading banks and financial institutions to help you secure the best home loan deals.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyZWI2ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="text-black">Get in </span>
                <span className="bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Have questions about a property or need assistance? We're here
                to help! Reach out to our expert team for personalized support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2 animate-slide-in-left">
                <div className="bg-white rounded-3xl shadow-2xl border border-[#2eb6f5]/10 p-8 hover:shadow-3xl transition-all duration-300">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Send us a <span className="text-[#2eb6f5]">Message</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        className="space-y-2 animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <Label
                          htmlFor="firstName"
                          className="text-[#2eb6f5] font-semibold"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 transition-colors duration-200 bg-[#f8fafc]"
                        />
                      </div>
                      <div
                        className="space-y-2 animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <Label
                          htmlFor="lastName"
                          className="text-[#2eb6f5] font-semibold"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 transition-colors duration-200 bg-[#f8fafc]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        className="space-y-2 animate-fade-in-up"
                        style={{ animationDelay: "0.3s" }}
                      >
                        <Label
                          htmlFor="email"
                          className="text-[#2eb6f5] font-semibold"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 transition-colors duration-200 bg-[#f8fafc]"
                        />
                      </div>
                      <div
                        className="space-y-2 animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                      >
                        <Label
                          htmlFor="phone"
                          className="text-[#2eb6f5] font-semibold"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 transition-colors duration-200 bg-[#f8fafc]"
                        />
                      </div>
                    </div>

                    <div
                      className="space-y-2 animate-fade-in-up"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Label
                        htmlFor="subject"
                        className="text-[#2eb6f5] font-semibold"
                      >
                        Subject
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("subject", value)
                        }
                      >
                        <SelectTrigger className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 bg-[#f8fafc]">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="buying">
                            Property Buying
                          </SelectItem>
                          <SelectItem value="selling">
                            Property Selling
                          </SelectItem>
                          <SelectItem value="renting">
                            Property Renting
                          </SelectItem>
                          <SelectItem value="investment">
                            Investment Advice
                          </SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div
                      className="space-y-2 animate-fade-in-up"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <Label
                        htmlFor="budget"
                        className="text-[#2eb6f5] font-semibold"
                      >
                        Budget Range (if applicable)
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("budget", value)
                        }
                      >
                        <SelectTrigger className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 bg-[#f8fafc]">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-25">
                            Under ₹25 Lacs
                          </SelectItem>
                          <SelectItem value="25-50">₹25 - ₹50 Lacs</SelectItem>
                          <SelectItem value="50-1cr">
                            ₹50 Lacs - ₹1 Cr
                          </SelectItem>
                          <SelectItem value="1-2cr">₹1 - ₹2 Cr</SelectItem>
                          <SelectItem value="above-2cr">Above ₹2 Cr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div
                      className="space-y-2 animate-fade-in-up"
                      style={{ animationDelay: "0.7s" }}
                    >
                      <Label
                        htmlFor="message"
                        className="text-[#2eb6f5] font-semibold"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your requirements..."
                        rows={5}
                        className="border-2 border-[#2eb6f5]/30 focus:border-[#2eb6f5] rounded-xl p-3 transition-colors duration-200 bg-[#f8fafc]"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: "0.8s" }}
                      size="lg"
                      type="submit"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 animate-slide-in-right">
                <div className="bg-white rounded-3xl shadow-2xl border border-[#2eb6f5]/10 p-8 hover:shadow-3xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    Contact <span className="text-[#2eb6f5]">Information</span>
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-2xl hover:bg-[#f8fafc] transition-all duration-300 group animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">
                            {info.title}
                          </h4>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 text-sm mb-1">
                              {detail}
                            </p>
                          ))}
                          <p className="text-xs text-[#2eb6f5] font-medium mt-2">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-[#2eb6f5]/10 p-8 hover:shadow-3xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Quick <span className="text-[#2eb6f5]">Actions</span>
                  </h3>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#2eb6f5]/30 hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 rounded-xl p-3 group"
                    >
                      <Phone className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Schedule a Call
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#2eb6f5]/30 hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 rounded-xl p-3 group"
                    >
                      <MessageCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Live Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[#2eb6f5]/30 hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 rounded-xl p-3 group"
                    >
                      <Calendar className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Book Site Visit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in-up mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Office <span className="text-[#2eb6f5]">Locations</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit us at any of our offices across India for personalized
                assistance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl border border-[#2eb6f5]/10 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 group animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2eb6f5] to-[#1e90ff] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {office.city} Office
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#2eb6f5] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">
                        {office.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#2eb6f5]" />
                      <span className="text-gray-600 text-sm">
                        {office.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#2eb6f5]" />
                      <span className="text-gray-600 text-sm">
                        {office.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-6 border-[#2eb6f5] text-[#2eb6f5] hover:bg-[#2eb6f5] hover:text-white transition-all duration-300 rounded-xl group"
                  >
                    Get Directions
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in-up mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked{" "}
                <span className="text-[#2eb6f5]">Questions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6 text-left">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl border border-[#2eb6f5]/10 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#2eb6f5] to-[#1e90ff] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Our team is always ready to help you find the perfect property
              solution
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#2eb6f5] hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                Call Us Now
                <Phone className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white hover:text-[#2eb6f5] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                Live Chat
                <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
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

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Contact;
