import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HoverDetail = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="group p-3 rounded-lg border border-border/50 bg-glass">
    <div className="font-medium">{title}</div>
    <div className="text-sm text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
      {children}
    </div>
  </div>
);

const EclipseInfo = () => {
  return (
    <Card className="p-4 bg-glass border-glass">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Eclipses</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Solar Eclipse</Button>
          <Button size="sm" variant="outline">Lunar Eclipse</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <HoverDetail title="What is a Solar Eclipse?">
          The Moon passes between the Sun and Earth, casting a shadow on Earth.
        </HoverDetail>
        <HoverDetail title="What is a Lunar Eclipse?">
          Earth passes between the Sun and Moon, and Earth's shadow falls on the Moon.
        </HoverDetail>
      </div>
    </Card>
  );
};

export default EclipseInfo;


