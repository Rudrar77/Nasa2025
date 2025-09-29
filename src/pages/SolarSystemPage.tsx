
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import EnhancedSolarSystem3D from '@/components/EnhancedSolarSystem3D';
import PageHeader from "@/components/PageHeader";
import StarfieldBackground from '@/components/StarfieldBackground';
import SolarSystemFacts from '@/components/SolarSystemFacts';
import SolarEventTimeline from '@/components/SolarEventTimeline';
import PlanetComparison from '@/components/PlanetComparison';
import ScrollNav from '@/components/ScrollNav';
import { 
  Sun, 
  Info, 
  Clock, 
  BarChart3,
  ArrowUp
} from 'lucide-react';

const SolarSystemPage = () => {
  const navSections = [
    { id: 'live-monitor', label: 'Live Solar Monitor', icon: <Sun className="w-4 h-4" /> },
    { id: 'facts', label: 'Solar System Facts', icon: <Info className="w-4 h-4" /> },
    { id: 'timeline', label: 'Solar Events Timeline', icon: <Clock className="w-4 h-4" /> },
    { id: 'comparison', label: 'Planet Comparison', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-space p-6 animate-fade-in relative overflow-hidden">
      <StarfieldBackground starCount={300} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <PageHeader 
          title="Interactive Solar System"
          subtitle="Explore our solar system in 3D and monitor real-time solar events as they happen!"
        />

        <Card id="live-monitor" className="p-6 animate-bounce-in scroll-mt-24">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">🌟 Live Solar Activity Monitor</h2>
            <p className="text-muted-foreground">
              Watch the most recent solar flares, CMEs, and their impact on Earth as they occur. Real-time visualization of the latest solar events.
            </p>
          </div>
          <EnhancedSolarSystem3D />
        </Card>

        <div id="facts" className="scroll-mt-24">
          <SolarSystemFacts />
        </div>

        <div id="timeline" className="scroll-mt-24">
          <SolarEventTimeline />
        </div>

        <div id="comparison" className="scroll-mt-24">
          <PlanetComparison />
        </div>
      </motion.div>

      <ScrollNav sections={navSections} />
      
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s ease; }
        @keyframes bounce-in { 0% { transform: scale(0.8); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
        .animate-bounce-in { animation: bounce-in 1s cubic-bezier(.68,-0.55,.27,1.55); }
      `}</style>
    </div>
  );
};

export default SolarSystemPage;


