import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/index" element={<Index />} />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    {isOnboarded ? <Dashboard /> : <Onboarding onComplete={handleOnboardingComplete} />}
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trip-planner" 
                element={
                  <ProtectedRoute>
                    <TripPlanner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/explore" 
                element={
                  <ProtectedRoute>
                    <Explore />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
