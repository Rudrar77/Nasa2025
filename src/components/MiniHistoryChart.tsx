import { Card } from "@/components/ui/card";

type Point = { time: string; value: number | null };

function Sparkline({ data, color = "#6366f1" }: { data: Point[]; color?: string }) {
  const w = 260;
  const h = 60;
  const xs = data.map((d, i) => (i / Math.max(1, data.length - 1)) * (w - 10) + 5);
  const vals = data.map((d) => (d.value == null ? null : d.value));
  const min = Math.min(...vals.filter((v): v is number => v != null));
  const max = Math.max(...vals.filter((v): v is number => v != null));
  const scaleY = (v: number) => h - 5 - ((v - min) / Math.max(1e-6, max - min || 1)) * (h - 10);

  let path = "";
  data.forEach((d, i) => {
    const x = xs[i];
    const y = d.value == null ? null : scaleY(d.value);
    if (y == null) return;
    path += (path ? " L" : "M") + x.toFixed(1) + "," + y.toFixed(1);
  });

  return (
    <svg width={w} height={h} className="block">
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MiniHistoryChart({ kp, wind }: { kp: Array<{ time: string; kp: number }>; wind: Array<{ time: string; speed: number | null }> }) {
  const kpPoints: Point[] = kp.map((p) => ({ time: p.time, value: p.kp }));
  const windPoints: Point[] = wind.map((p) => ({ time: p.time, value: p.speed }));

  return (
    <Card className="p-3 bg-glass border-glass">
      <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
        <span>Kp (last 24)</span>
        <span>Wind (last 48)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Sparkline data={kpPoints} color="#ef4444" />
        <Sparkline data={windPoints} color="#22d3ee" />
      </div>
    </Card>
  );
}


