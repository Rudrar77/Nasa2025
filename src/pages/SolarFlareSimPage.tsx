import { Suspense, useState } from "react";
import PageHeader from "@/components/PageHeader";
import LiveImpact from "@/components/LiveImpact";
import SolarFlareGame from "@/components/SolarFlareGame";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Activity } from "lucide-react";

const SolarFlareSimPage = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 animate-fade-in p-6">
      <div className="max-w-4xl w-full space-y-6">
        <PageHeader 
          title="Solar Flare Defense" 
          subtitle={showGame ? "Protect Earth from solar flares in this interactive game!" : "Monitor and defend against solar activity."} 
        />
        
        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant={showGame ? "outline" : "default"}
            onClick={() => setShowGame(false)}
            className="flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Live Activity
          </Button>
          <Button
            variant={showGame ? "default" : "outline"}
            onClick={() => setShowGame(true)}
            className="flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4" />
            Play Defense Game
          </Button>
        </div>

        <Card className="p-6 backdrop-blur-md bg-white/80 shadow-2xl animate-bounce-in">
          {showGame ? (
            <SolarFlareGame />
          ) : (
            <Suspense fallback={<Card className="p-4">Loading live solar data...</Card>}>
              <LiveImpact />
            </Suspense>
          )}
        </Card>
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

export default SolarFlareSimPage;


