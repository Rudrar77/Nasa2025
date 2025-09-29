import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Camera } from "lucide-react";

const Story = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Story</h1>
      <p className="text-muted-foreground mb-6">Pick a perspective to explore how space weather shapes our world.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 bg-glass border-glass">
          <div className="flex items-start gap-3">
            <Sun className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">Flare's Space Weather Adventure</h2>
              <p className="text-sm text-muted-foreground mb-3">A friendly solar flare travels from the Sun to Earth.</p>
              <Button asChild>
                <Link to="/adventure">Start</Link>
              </Button>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-glass border-glass">
          <div className="flex items-start gap-3">
            <Camera className="h-6 w-6 text-secondary" />
            <div>
              <h2 className="text-xl font-semibold">Aurora Photographer's Tale</h2>
              <p className="text-sm text-muted-foreground mb-3">Chasing lights, dodging radio blackouts, and checking forecasts.</p>
              <Button asChild variant="secondary">
                <Link to="/story/photographer">Read</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Story;


