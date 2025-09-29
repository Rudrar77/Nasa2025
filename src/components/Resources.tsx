import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

type Resource = { title: string; url: string; description?: string };

const nasa: Resource[] = [
  { title: "NASA Space Weather Program", url: "https://science.nasa.gov/heliophysics/space-weather/" },
  { title: "Solar Storms and Flares", url: "https://www.nasa.gov/mission/science/solar-storms-and-flares/" },
  { title: "SWAG 2024 User Needs Survey", url: "https://www.swpc.noaa.gov/content/space-weather-advisory-group-swag" },
  { title: "Centers of Excellence", url: "https://science.nasa.gov/heliophysics/programs/space-weather-centers-of-excellence/" },
  { title: "Heliophysics Fleet", url: "https://science.nasa.gov/heliophysics/missions/" },
];

const partners: Resource[] = [
  { title: "NOAA SWPC", url: "https://www.swpc.noaa.gov/" },
  { title: "CSA Space Weather Canada", url: "https://spaceweather.gc.ca/" },
  { title: "AEB EMBRACE (INPE)", url: "https://www2.inpe.br/climaespacial/" },
];

export default function Resources() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4 bg-glass border-glass">
        <h3 className="font-semibold mb-2">NASA Data & Resources</h3>
        <ul className="space-y-2 text-sm">
          {nasa.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                {r.title} <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4 bg-glass border-glass">
        <h3 className="font-semibold mb-2">Space Agency Partner Resources</h3>
        <ul className="space-y-2 text-sm">
          {partners.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                {r.title} <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}


