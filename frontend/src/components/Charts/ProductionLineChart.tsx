import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchHistorical } from "../../services/api";

interface HistoricalPoint {
  ts: string;
  oee: number;
  throughput: number;
  fault_rate: number;
  energy_kwh: number;
  temperature: number;
  vibration?: number;
  speed?: number;
  fault_risk?: number;
}

interface HistoricalChartProps {
  machine_id?: number;
  hours?: number;
}

export default function HistoricalChart({
  machine_id = 12,
  hours = 24,
}: HistoricalChartProps) {
  const [data, setData] = useState<HistoricalPoint[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadHistoricalData = async () => {
      try {
        const res = await fetchHistorical(machine_id, hours);
        const points = Array.isArray(res) ? res : res.data ?? [];
        if (mounted) setData(points);
      } catch (err) {
        console.error("Error fetching historical data:", err);
      }
    };

    loadHistoricalData();

    return () => {
      mounted = false;
    };
  }, [machine_id, hours]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Historical KPI Trends</h3>
      {data.length === 0 ? (
        <p>Loading historical data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis
              dataKey="ts"
              tickFormatter={(ts: string) => new Date(ts).toLocaleTimeString()}
            ></XAxis>
            <YAxis />
            <Tooltip
              labelFormatter={(ts: string) => new Date(ts).toLocaleTimeString()}
            />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="oee"
              stroke="#4f46e5"
              name="OEE (%)"
            />
            <Line
              type="monotone"
              dataKey="throughput"
              stroke="#10b981"
              name="Throughput (units/h)"
            />
            <Line
              type="monotone"
              dataKey="fault_rate"
              stroke="#ef4444"
              name="Fault Rate (%)"
            />
            <Line
              type="monotone"
              dataKey="energy_kwh"
              stroke="#facc15"
              name="Energy (kWh)"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              name="Temperature (°C)"
            />
            {data.some((d) => d.vibration !== undefined) && (
              <Line
                type="monotone"
                dataKey="vibration"
                stroke="#8b5cf6"
                name="Vibration"
              />
            )}
            {data.some((d) => d.speed !== undefined) && (
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#3b82f6"
                name="Speed"
              />
            )}
            {data.some((d) => d.fault_risk !== undefined) && (
              <Line
                type="monotone"
                dataKey="fault_risk"
                stroke="#e11d48"
                name="Fault Risk"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
