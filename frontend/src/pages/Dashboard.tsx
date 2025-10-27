import { useEffect, useState } from "react";
import KPIcard from "../components/KPI/KPIcard";
import useWebSocket from "../hooks/useWebSocket";
import { fetchKPI } from "../services/api";
import HistoricalChart from "../components/Charts/ProductionLineChart";

interface KPIData {
  machine_id: number;
  timestamp: string;
  oee: number;
  throughput: number;
  fault_rate: number;
  energy_kwh: number;
  temperature: number;
  vibration?: number;
  speed?: number;
  fault_risk?: number;
}

export default function Dashboard() {
  const [data, setData] = useState<KPIData | null>(null);
  const liveData = useWebSocket("ws://localhost:8000/ws/live-data");

  // Fetch initial KPI snapshot
  useEffect(() => {
    fetchKPI()
      .then((kpi) => setData(kpi))
      .catch((err) => console.error("Error fetching initial KPI data:", err));
  }, []);

  // Merge live updates into existing KPI data
  useEffect(() => {
    if (liveData) {
      setData((prev) => {
        // if no initial snapshot yet, create one from the live message
        if (!prev) {
          return {
            machine_id: liveData.machine_id ?? 12,
            timestamp: liveData.ts ?? new Date().toISOString(),
            oee: liveData.oee ?? 0,
            throughput: liveData.throughput ?? 0,
            fault_rate: liveData.fault_rate ?? 0,
            energy_kwh: liveData.energy_kwh ?? 0,
            temperature: liveData.temperature ?? 0,
            vibration: liveData.vibration,
            speed: liveData.speed,
            fault_risk: liveData.fault_risk ?? 0,
          };
        }

        // otherwise merge all available fields from the live payload
        // mapping `ts` -> `timestamp` and preferring live values when present.
        return {
          ...prev,
          machine_id: liveData.machine_id ?? prev.machine_id,
          timestamp: liveData.ts ?? prev.timestamp,
          oee: liveData.oee ?? prev.oee,
          throughput: liveData.throughput ?? prev.throughput,
          fault_rate: liveData.fault_rate ?? prev.fault_rate,
          energy_kwh: liveData.energy_kwh ?? prev.energy_kwh,
          temperature: liveData.temperature ?? prev.temperature,
          vibration: liveData.vibration ?? prev.vibration,
          speed: liveData.speed ?? prev.speed,
          fault_risk: liveData.fault_risk ?? prev.fault_risk,
        };
      });
    }
  }, [liveData]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Machine Dashboard
        </h2>

        {!data ? (
          <p className="text-gray-600">Connecting to live data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            <KPIcard
              title="OEE"
              value={data.oee.toFixed(1)}
              unit="%"
              color="bg-indigo-300"
            />
            <KPIcard
              title="Throughput"
              value={data.throughput}
              unit="units/h"
              color="bg-green-300"
            />
            <KPIcard
              title="Fault Rate"
              value={data.fault_rate.toFixed(2)}
              unit="%"
              color="bg-red-300"
            />
            <KPIcard
              title="Energy"
              value={data.energy_kwh.toFixed(1)}
              unit="kWh"
              color="bg-yellow-300"
            />
            <KPIcard
              title="Temperature"
              value={data.temperature.toFixed(1)}
              unit="°C"
              color="bg-orange-300"
            />
          </div>
        )}
      </div>

      {/* historical chart */}
      <div className="mt-8 text-gray-800">
        <HistoricalChart machine_id={data?.machine_id || 12} hours={24} />
      </div>
    </>
  );
}
