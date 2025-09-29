import PageHeader from "@/components/PageHeader";
import LiveImpact from "@/components/LiveImpact";
import MiniHistoryChart from "@/components/MiniHistoryChart";
import { useSpaceWeatherLive } from "@/hooks/useSpaceWeatherLive";

const CMEImpactPage = () => {
  const live = useSpaceWeatherLive(60_000) as ReturnType<typeof useSpaceWeatherLive> & { severity: number };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 animate-fade-in">
      <div className="max-w-3xl w-full p-8 rounded-3xl shadow-2xl bg-white/80 animate-bounce-in">
        <PageHeader title="CME Impact on Earth" subtitle="Live severity and recent trends." />
        <div className="mt-4">
          <LiveImpact />
          {live.kpHistory && live.windHistory && (
            <MiniHistoryChart kp={live.kpHistory} wind={live.windHistory} />
          )}
        </div>
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

export default CMEImpactPage;


