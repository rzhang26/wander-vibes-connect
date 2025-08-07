import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";

const queryClient = new QueryClient();

const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isOnboarded ? <Dashboard /> : <Onboarding onComplete={handleOnboardingComplete} />
              } 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
