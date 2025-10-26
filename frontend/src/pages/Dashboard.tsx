import KPIcard from "../components/KPI/KPIcard";
import useWebSocket from "../hooks/useWebSocket";

export default function Dashboard() {
  const liveData = useWebSocket("ws://localhost:8000/ws/live-data");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Machine Dashboard
      </h2>

      {!liveData ? (
        <p className="text-gray-600">Connecting to live data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          <KPIcard
            title="OEE"
            value={liveData.oee}
            unit="%"
            color="bg-indigo-300"
          />
          <KPIcard
            title="Throughput"
            value={liveData.throughput}
            unit="units/h"
            color="bg-green-300"
          />
          <KPIcard
            title="Fault Rate"
            value={liveData.fault_rate}
            unit="%"
            color="bg-red-300"
          />
          <KPIcard
            title="Energy"
            value={liveData.energy_kwh}
            unit="kWh"
            color="bg-yellow-300"
          />
          <KPIcard
            title="Temperature"
            value={liveData.temperature}
            unit="°C"
            color="bg-orange-300"
          />
        </div>
      )}
    </div>
  );
}
