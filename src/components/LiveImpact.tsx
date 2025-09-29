import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertTriangle, Satellite, Zap } from "lucide-react";
import { useSpaceWeatherLive } from "@/hooks/useSpaceWeatherLive";

type Props = {
  className?: string;
};

const severityToLabel = (s: number) => {
  if (s >= 0.75) return { label: "Severe", variant: "destructive" as const };
  if (s >= 0.45) return { label: "Moderate", variant: "secondary" as const };
  return { label: "Quiet", variant: "default" as const };
};

export default function LiveImpact({ className }: Props) {
  const data = useSpaceWeatherLive(60_000) as ReturnType<typeof useSpaceWeatherLive> & { severity: number };

  const level = severityToLabel(data.severity || 0);
  const ringOpacity = 0.2 + (data.severity || 0) * 0.6;
  const ringSize = 160 + Math.round((data.severity || 0) * 120); // px

  return (
    <Card className={"p-4 bg-glass border-glass backdrop-blur " + (className || "")}> 
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold inline-flex items-center gap-2">
          <Satellite className="h-4 w-4 text-primary" /> Live Space Weather Impact
        </div>
        <Badge variant={level.variant}>{level.label}</Badge>
      </div>

      {data.loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Fetching live data...
        </div>
      ) : data.error ? (
        <div className="flex items-center gap-2 text-yellow-600">
          <AlertTriangle className="h-4 w-4" /> {data.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 relative h-64 flex items-center justify-center">
            <div className="relative" style={{ width: ringSize, height: ringSize }}>
              <div className="absolute inset-0 rounded-full bg-blue-500/60 shadow-aurora" />
              <div
                className="absolute inset-0 rounded-full border-2 border-primary animate-ping"
                style={{ opacity: ringOpacity }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 ${20 + Math.round((data.severity || 0) * 60)}px rgba(99,102,241,${0.35 + ringOpacity * 0.5})`,
                }}
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Earth auroral activity proxy (kp + solar wind)
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kp (planetary index)</span>
              <span className="font-medium">{data.kpNow ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Solar wind speed (km/s)</span>
              <span className="font-medium">{data.solarWindSpeed ? `${Math.round(data.solarWindSpeed)}` : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Density (1/cm³)</span>
              <span className="font-medium">{data.solarWindDensity ? `${Math.round(data.solarWindDensity)}` : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Updated (local time)</span>
              <span className="font-medium">{data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : "—"}</span>
            </div>
            <div className="pt-2 text-xs text-muted-foreground inline-flex items-center gap-1">
              <Zap className="h-3 w-3" /> Data source: NOAA SWPC
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}


