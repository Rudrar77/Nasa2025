import { useEffect, useMemo, useState } from "react";

type KpPoint = {
  time: string;
  kp: number;
};

type PlasmaPoint = {
  time: string;
  density: number | null;
  speed: number | null;
  temperature: number | null;
};

export type SpaceWeatherLive = {
  kpNow: number | null;
  kpTime: string | null;
  solarWindSpeed: number | null; // km/s
  solarWindDensity: number | null; // 1/cm^3
  kpHistory?: Array<{ time: string; kp: number }>; // recent
  windHistory?: Array<{ time: string; speed: number | null }>; // recent
  lastUpdated: string | null;
  loading: boolean;
  error?: string;
};

const KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
const PLASMA_URL = "https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json";

export function useSpaceWeatherLive(refreshMs: number = 60_000): SpaceWeatherLive {
  const [state, setState] = useState<SpaceWeatherLive>({
    kpNow: null,
    kpTime: null,
    solarWindSpeed: null,
    solarWindDensity: null,
    lastUpdated: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      try {
        const [kpRes, plasmaRes] = await Promise.all([
          fetch(KP_URL, { cache: "no-store" }),
          fetch(PLASMA_URL, { cache: "no-store" }),
        ]);

        const kpJson: any[] = await kpRes.json();
        const plasmaJson: any[] = await plasmaRes.json();

        // KP data: first row is headers; subsequent rows are [time, kp_est, a_idx, status]
        const kpRows = kpJson.slice(1) as any[];
        const latestKp = kpRows[kpRows.length - 1];
        const kpHistory = kpRows.slice(-24).map((r) => ({ time: String(r[0]), kp: Number(r[1]) }));
        const kpPoint: KpPoint | null = latestKp
          ? { time: String(latestKp[0]), kp: Number(latestKp[1]) }
          : null;

        // Plasma data: first row headers [time, density, speed, temperature]
        const plasmaRows = plasmaJson.slice(1) as any[];
        const latestPlasma = plasmaRows[plasmaRows.length - 1];
        const windHistory = plasmaRows.slice(-48).map((r) => ({ time: String(r[0]), speed: r[2] != null ? Number(r[2]) : null }));
        const plasmaPoint: PlasmaPoint | null = latestPlasma
          ? {
              time: String(latestPlasma[0]),
              density: latestPlasma[1] != null ? Number(latestPlasma[1]) : null,
              speed: latestPlasma[2] != null ? Number(latestPlasma[2]) : null,
              temperature: latestPlasma[3] != null ? Number(latestPlasma[3]) : null,
            }
          : null;

        if (!mounted) return;
        setState({
          kpNow: kpPoint?.kp ?? null,
          kpTime: kpPoint?.time ?? null,
          solarWindSpeed: plasmaPoint?.speed ?? null,
          solarWindDensity: plasmaPoint?.density ?? null,
          kpHistory,
          windHistory,
          lastUpdated: new Date().toISOString(),
          loading: false,
        });
      } catch (e: any) {
        if (!mounted) return;
        setState((prev) => ({ ...prev, loading: false, error: e?.message || "Failed to load live data" }));
      }
    }

    fetchAll();
    const id = setInterval(fetchAll, refreshMs);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [refreshMs]);

  // Derived impact severity 0-1, based on kp (0-9) and speed (<=1000 km/s)
  const severity = useMemo(() => {
    const kpNorm = state.kpNow != null ? Math.min(Math.max(state.kpNow, 0), 9) / 9 : 0;
    const speedNorm = state.solarWindSpeed != null ? Math.min(Math.max(state.solarWindSpeed, 200), 1000) / 1000 : 0;
    // Weighted severity
    return Math.min(1, kpNorm * 0.7 + speedNorm * 0.5);
  }, [state.kpNow, state.solarWindSpeed]);

  return { ...state, // expose severity by duck-typing without changing type
    // @ts-expect-error expose derived for visualization only
    severity } as SpaceWeatherLive & { severity: number };
}


