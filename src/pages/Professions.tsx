import { Card } from "@/components/ui/card";
import { Plane, Sprout, Server } from "lucide-react";

const Professions = () => {
  const items = [
    {
      icon: Plane,
      title: "Pilot",
      story: "I'm Ravi, a 28-year-old pilot. High solar activity can cause HF radio blackouts. Before long polar routes, we check forecasts and reroute if needed.",
      impacts: ["HF radio blackouts", "GPS accuracy dips", "Radiation considerations on high-altitude routes"],
    },
    {
      icon: Sprout,
      title: "Farmer",
      story: "I'm Mira, 35, a farmer. During storms, GPS tractor guidance can drift. I switch to visual markers and plan fieldwork around active periods.",
      impacts: ["GPS guidance drift", "Connectivity interruptions", "Timing of field operations"],
    },
    {
      icon: Server,
      title: "IT Engineer",
      story: "I'm Lee, 31, in IT. Geomagnetic storms can affect satellites and timing. We monitor alerts and add redundancy for critical services.",
      impacts: ["Timing sync issues", "Satellite link degradation", "Power grid anomalies"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold">People Affected by Space Weather</h1>
      <p className="text-muted-foreground">Short stories showing real-world impacts and adaptations.</p>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, story, impacts }) => (
          <Card key={title} className="p-4 bg-glass border-glass">
            <div className="inline-flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{story}</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {impacts.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Professions;


