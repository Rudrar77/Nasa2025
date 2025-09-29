import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, Suspense } from "react";
import ParticleField from "@/components/ParticleField";
import InteractiveSpace from "@/components/InteractiveSpace";
import InteractiveHotspot from "@/components/InteractiveHotspot";
import LiveImpact from "@/components/LiveImpact";
import LiveSolarDashboard from "@/components/LiveSolarDashboard";
import { useSpaceWeatherLive } from "@/hooks/useSpaceWeatherLive";
import spaceWeatherImpacts from "@/assets/space-weather-impacts.jpg";
import { Zap, Globe, Sun } from "lucide-react";
import Resources from "@/components/Resources";
import MiniHistoryChart from "@/components/MiniHistoryChart";
import PageHeader from "@/components/PageHeader";

const SpaceWeather = () => {
  const [flareCount, setFlareCount] = useState(0);
  const [impactCount, setImpactCount] = useState(0);
  const live = useSpaceWeatherLive(60_000) as ReturnType<typeof useSpaceWeatherLive> & { severity: number };

  const hotspots = [
    { id: "gps", title: "GPS", description: "Disrupts positioning", icon: "satellite" as const, position: { x: 25, y: 30 }, color: "solar" as const },
    { id: "radio", title: "Radio", description: "HF blackouts", icon: "zap" as const, position: { x: 60, y: 45 }, color: "aurora" as const },
    { id: "power", title: "Grid", description: "Geomagnetically induced currents", icon: "globe" as const, position: { x: 40, y: 70 }, color: "cosmic" as const },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-fade-in">
      <div className="max-w-4xl w-full p-8 rounded-3xl shadow-2xl bg-white/80 animate-bounce-in relative z-10">
        <PageHeader title="Space Weather" subtitle="Live visualizations of solar activity and Earth impacts.">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Sun className="h-4 w-4" /> Live Kp and solar wind update every minute
          </div>
        </PageHeader>

        <div className="my-6">
          <Suspense fallback={<Card className="p-4">Loading NASA solar activity data...</Card>}>
            <LiveSolarDashboard />
          </Suspense>
        </div>

        <div className="my-6">
          <Suspense fallback={<Card className="p-4">Loading live space weather data...</Card>}>
            <LiveImpact />
          </Suspense>
        </div>

        {live.kpHistory && live.windHistory && (
          <Suspense fallback={<Card className="p-4">Loading historical data...</Card>}>
            <MiniHistoryChart kp={live.kpHistory} wind={live.windHistory} />
          </Suspense>
        )}

        <Card className="p-4 bg-glass border-glass backdrop-blur mt-6">
          <h2 className="font-semibold mb-3 inline-flex items-center gap-2"><Globe className="h-4 w-4 text-secondary" /> Earth Impacts</h2>
          {impactCount > 0 && (
            <div className="mb-2">
              <Badge variant="secondary">CME impacts on Earth: {impactCount}</Badge>
            </div>
          )}
          <InteractiveHotspot
            hotspots={hotspots}
            imageSrc={spaceWeatherImpacts}
            imageAlt="Space weather impacts visualization"
            className="border border-border"
          />
        </Card>

        <div className="mt-6">
          <Resources />
        </div>
      </div>
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <ParticleField density={60} color="hsl(264, 83%, 70%)" speed={0.6} className="h-full" />
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s ease; }
        @keyframes bounce-in { 0% { transform: scale(0.8); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
        .animate-bounce-in { animation: bounce-in 1s cubic-bezier(.68,-0.55,.27,1.55); }
      `}</style>
    </div>
  );
};

export default SpaceWeather;


