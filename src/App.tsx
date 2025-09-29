import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Adventure from "./pages/Adventure";
import SpaceWeather from "./pages/SpaceWeather";
import Story from "./pages/Story";
import Photographer from "./pages/Photographer";
import About from "./pages/About";
import Professions from "./pages/Professions";
import SolarSystemPage from "./pages/SolarSystemPage";
import EclipsesPage from "./pages/EclipsesPage";
import SolarFlareSimPage from "./pages/SolarFlareSimPage";
import CMEImpactPage from "./pages/CMEImpactPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";

// Advanced Components
import { OfflineProvider } from "./components/OfflineMode";
import { GamificationProvider } from "./components/GamificationSystem";
import { MultiLanguageProvider } from "./components/MultiLanguageSupport";
import { AccessibilityProvider } from "./components/AccessibilityEnhancer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MultiLanguageProvider defaultLanguage="en">
      <OfflineProvider>
        <GamificationProvider>
          <AccessibilityProvider
            announcePageChanges={true}
            enableKeyboardNavigation={true}
            enableScreenReaderOptimizations={true}
          >
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/adventure" element={<Adventure />} />
                  <Route path="/space-weather" element={<SpaceWeather />} />
                  <Route path="/story" element={<Story />} />
                  <Route path="/story/photographer" element={<Photographer />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/professions" element={<Professions />} />
                  <Route path="/solar-system" element={<SolarSystemPage />} />
                  <Route path="/eclipses" element={<EclipsesPage />} />
                  <Route path="/solar-flare" element={<SolarFlareSimPage />} />
                  <Route path="/cme-impact" element={<CMEImpactPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </BrowserRouter>
            </TooltipProvider>
          </AccessibilityProvider>
        </GamificationProvider>
      </OfflineProvider>
    </MultiLanguageProvider>
  </QueryClientProvider>
);

export default App;
