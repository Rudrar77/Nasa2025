import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveImpact from "@/components/LiveImpact";
import { useSpaceWeatherLive } from "@/hooks/useSpaceWeatherLive";
import { Camera, Radio, Satellite, AlertTriangle } from "lucide-react";

const Photographer = () => {
  const live = useSpaceWeatherLive(60_000) as ReturnType<typeof useSpaceWeatherLive> & { severity: number };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold">Aurora Photographer's Tale</h1>
      <p className="text-muted-foreground">Hi! I'm Aria, a 17-year-old photographer who chases auroras. Space weather is my weather report!</p>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-glass border-glass md:col-span-2">
          <h2 className="font-semibold mb-2 inline-flex items-center gap-2"><Camera className="h-4 w-4" /> Tonight's Plan</h2>
          <p className="text-sm text-muted-foreground">I watch the Kp index and solar wind speed. If they climb, I pack my camera and head north.</p>
          <div className="mt-3">
            <LiveImpact />
          </div>
        </Card>
        <Card className="p-4 bg-glass border-glass">
          <h2 className="font-semibold mb-2 inline-flex items-center gap-2"><Satellite className="h-4 w-4" /> What I check</h2>
          <ul className="text-sm space-y-2">
            <li><Badge variant="secondary">Kp: {live.kpNow ?? '—'}</Badge> Planetary activity</li>
            <li><Badge variant="secondary">Wind: {live.solarWindSpeed ? Math.round(live.solarWindSpeed) : '—'} km/s</Badge> Faster wind, brighter auroras</li>
            <li><Badge variant="secondary">Density: {live.solarWindDensity ? Math.round(live.solarWindDensity) : '—'} /cm³</Badge> More particles, more glow</li>
          </ul>
        </Card>
      </div>

      <Card className="p-4 bg-glass border-glass">
        <h2 className="font-semibold mb-2 inline-flex items-center gap-2"><Radio className="h-4 w-4" /> Impacts I Notice</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>GPS can drift; I double-check coordinates.</li>
          <li>Radio noise rises; I carry backups.</li>
          <li>Power flickers on rare strong storms.</li>
        </ul>
        <div className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Be prepared: safety first when traveling at night.</div>
      </Card>
    </div>
  );
};

export default Photographer;


