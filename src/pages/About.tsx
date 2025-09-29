import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold">About Space Weather</h1>
      <p className="text-muted-foreground max-w-3xl">Space weather refers to variations in the space environment between the Sun and Earth. It includes solar flares, coronal mass ejections (CMEs), and the solar wind—all of which can impact technologies in space and on Earth.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-glass border-glass">
          <h2 className="font-semibold mb-2">Solar Flare</h2>
          <p className="text-sm text-muted-foreground">A sudden burst of electromagnetic energy from the Sun. Can cause radio blackouts.</p>
        </Card>
        <Card className="p-4 bg-glass border-glass">
          <h2 className="font-semibold mb-2">CME</h2>
          <p className="text-sm text-muted-foreground">A large bubble of plasma and magnetic field ejected from the Sun. Can trigger geomagnetic storms and auroras.</p>
        </Card>
        <Card className="p-4 bg-glass border-glass">
          <h2 className="font-semibold mb-2">Solar Wind</h2>
          <p className="text-sm text-muted-foreground">A continuous stream of charged particles flowing from the Sun.</p>
        </Card>
      </div>

      <Card className="p-4 bg-glass border-glass">
        <h2 className="font-semibold mb-2">Why it matters</h2>
        <p className="text-sm text-muted-foreground">Space weather can disrupt GPS, radio communications, satellites, and power grids. As technology use grows, understanding and forecasting space weather becomes more important.</p>
      </Card>
    </div>
  );
};

export default About;


