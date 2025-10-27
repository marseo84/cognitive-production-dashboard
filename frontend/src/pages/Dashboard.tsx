import { useEffect, useState } from "react";
import KPIcard from "../components/KPI/KPICard";
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

  // conditional rendering based on data availability
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Connecting to live data...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header with filters and data/time */}
      <DashboardHeader />

      {/* KPI Summary Grid */}
      <KPIGrid data={data} />

      {/* Two/column layout for gauges and alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time gauges */}
        <div className="lg:col-span-2">
          <GaugePanel data={data} />
        </div>

        {/* Alerts panel */}
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>

      {/* Historical / Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionLineChart machine_id={data.machine_id} hours={24} />
        <FaultBarChart machine_id={data.machine_id} hours={24} />
      </div>
    </div>
  );
}
