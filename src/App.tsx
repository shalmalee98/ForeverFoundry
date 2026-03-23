import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import RSVP from "./pages/RSVP";
import Travel from "./pages/Travel";
import Family from "./pages/Family";
import Traditions from "./pages/Traditions";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateWedding from "./pages/CreateWedding";
import Preview from "./pages/Preview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
