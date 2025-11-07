// ✅ Import required components and libraries
import { Toaster } from "@/components/ui/toaster";
// Custom toast notification component for showing alerts/messages in UI

import { Toaster as Sonner } from "@/components/ui/sonner";
// Another notification system (renamed as Sonner) for advanced toast features

import { TooltipProvider } from "@/components/ui/tooltip";
// Provides global tooltip support for the entire app (used with tooltips on buttons, icons, etc.)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// React Query library for managing server state, caching API responses, and syncing data

import { BrowserRouter, Routes, Route } from "react-router-dom";
// React Router DOM for handling client-side navigation without page reload
import PropertyDetail from "./pages/PropertyDetail";

// ✅ Importing different page components for routes
import Index from "./pages/Index"; // Home page
import About from "./pages/About"; // About us page
import Contact from "./pages/Contact"; // Contact page
import Signup from "./pages/Signup"; // User signup page
import Signin from "./pages/Signin"; // User login page
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Privacy policy details
import NotFound from "./pages/NotFound"; // 404 Page Not Found
import CreateListing from "./pages/Createlisting"; // Page for creating property listings
import Profile from "./pages/Profile"; // User profile dashboard
import Buy from "./pages/Buy"; // Page listing properties for sale
import Rent from "./pages/Rent"; // Page listing properties for rent
import Purchased from "@/pages/Purchased"; // Shows purchased property details
import Favorites from "@/pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ✅ Create a QueryClient instance for React Query
const queryClient = new QueryClient();
// This is used to manage and cache all API calls globally

// ✅ Main App Component
const App = () => (
  // Provide the QueryClient globally so all components can access React Query features
  <QueryClientProvider client={queryClient}>
    {/* Provides global tooltip support across the app */}
    <TooltipProvider>
      {/* Notification Components for showing alerts/messages */}
      <Toaster /> {/* Displays standard notifications */}
      <Sonner /> {/* Displays advanced/custom notifications */}
      {/* BrowserRouter enables single-page application (SPA) navigation */}
      <BrowserRouter>
        {/* Routes define which component should render for each URL */}
        <Routes>
          {/* ✅ Define all application routes */}
          <Route path="/" element={<Index />} /> {/* Home page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="/signup" element={<Signup />} />{" "}
          {/* User registration page */}
          <Route path="/signin" element={<Signin />} /> {/* User login page */}
          <Route path="/privacy" element={<PrivacyPolicy />} />{" "}
          {/* Privacy policy page */}
          <Route path="/CreateListing" element={<CreateListing />} />{" "}
          {/* Page for creating property listings */}
          <Route path="/profile" element={<Profile />} />{" "}
          {/* User profile/dashboard */}
          <Route path="/Buy" element={<Buy />} />{" "}
          {/* List of properties for sale */}
          <Route path="/Rent" element={<Rent />} />{" "}
          {/* List of properties for rent */}
          <Route path="/purchased" element={<Purchased />} />{" "}
          {/* Purchased properties page */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          {/* ✅ Catch-all route: if user navigates to an unknown path, show 404 Not Found page */}
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// ✅ Export App component as default
export default App;
