import { useEffect, useState, useRef } from "react";

export interface LiveData {
  ts: string;
  machine_id: number;
  oee: number;
  throughput: number;
  fault_rate: number;
  energy_kwh: number;
  temperature: number;
}

export default function useWebSocket(url: string) {
  const [data, setData] = useState<LiveData | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => console.log("✅ Connected to WebSocket", url);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };
    ws.onerror = (err) => console.error("❌ WebSocket error:", err);
    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    return () => ws.close();
  }, [url]);

  return data;
}
