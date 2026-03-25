import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./vite-pages/Index";
import Events from "./vite-pages/Events";
import Gallery from "./vite-pages/Gallery";
import RSVP from "./vite-pages/RSVP";
import Travel from "./vite-pages/Travel";
import Family from "./vite-pages/Family";
import Traditions from "./vite-pages/Traditions";
import NotFound from "./vite-pages/NotFound";
import LandingPage from "./vite-pages/LandingPage";
import Login from "./vite-pages/Login";
import Signup from "./vite-pages/Signup";
import Dashboard from "./vite-pages/Dashboard";
import CreateWedding from "./vite-pages/CreateWedding";
import Preview from "./vite-pages/Preview";
import { WeddingBuilder } from "./components/wedding-builder/WeddingBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<WeddingBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateWedding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/family" element={<Family />} />
          <Route path="/traditions" element={<Traditions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
