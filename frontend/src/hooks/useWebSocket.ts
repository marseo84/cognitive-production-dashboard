import { useEffect, useState, useRef } from "react";

export interface LiveData {
  ts: string;
  machine_id: number;
  oee: number;
  throughput: number;
  fault_rate: number;
  energy_kwh: number;
  temperature: number;
  // Optional
  vibration?: number;
  speed?: number;
  fault_risk?: number;
}

export default function useWebSocket(url: string) {
  const [data, setData] = useState<LiveData | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // check if the WebSocket is already connected
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => console.log("✅ Connected to WebSocket", url);
    ws.onmessage = (event) => {
      // console.log("WS message:", event.data); // debugging

      try {
        const message = JSON.parse(event.data);
        // set the full object
        setData(message);
      } catch (err) {
        console.error("❌ Non-JSON WebSocket message received:", err);
      }
    };
    ws.onerror = (err) => console.error("❌ WebSocket error:", err);
    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    // cleanup function: close the WebSocket when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  return data;
}
