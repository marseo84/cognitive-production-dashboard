import { useEffect, useState, useRef } from "react";

export interface LiveData {
  machine_id?: number;
  ts?: string;
  oee?: number;
  throughput?: number;
  fault_rate?: number;
  energy_kwh?: number;
  temperature?: number;
  vibration?: number;
  speed?: number;
  fault_risk?: number;
  [key: string]: any;
}

export default function useWebSocket(url: string) {
  const [data, setData] = useState<LiveData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<number>(0);
  const shouldReconnect = useRef<boolean>(true);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let mounted = true;
    shouldReconnect.current = true;

    const connect = () => {
      try {
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
          reconnectRef.current = 0;
          console.info("✅ Connected to WebSocket", url);
        };

        ws.onmessage = (ev) => {
          try {
            const parsed = JSON.parse(ev.data);
            if (mounted) setData(parsed);
          } catch (err) {
            console.warn("useWebSocket: failed to parse message:", err);
          }
        };

        ws.onerror = (ev) => {
          console.warn("❌ WebSocket error:", ev);
        };

        ws.onclose = (ev) => {
          wsRef.current = null;
          // if page is unloading or intentionally closed, avoid reconnect attempts
          if (!shouldReconnect.current) {
            console.info(
              "🔌 WebSocket closed (no reconnect):",
              ev.code,
              ev.reason
            );
            return;
          }

          // Log disconnects, but do not treat them as fatal errors (common on refresh)
          if (ev.code === 1000 || ev.code === 1001) {
            console.info("🔌 WebSocket disconnected:", ev.code, ev.reason);
          } else {
            console.warn("❌ WebSocket disconnected", ev);
          }

          // Exponential backoff with cap
          const delay = Math.min(10000, 1000 * 2 ** reconnectRef.current);
          reconnectRef.current += 1;
          setTimeout(() => connect(), delay);
        };
      } catch (err) {
        console.warn("useWebSocket: connection failed, retrying:", err);
        const delay = Math.min(10000, 1000 * 2 ** reconnectRef.current);
        reconnectRef.current += 1;
        setTimeout(() => connect(), delay);
      }
    };

    connect();

    const handleBeforeUnload = () => {
      // stop reconnect attempts and close cleanly on page unload
      shouldReconnect.current = false;
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.close(1000, "page unload");
        } catch {}
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      mounted = false;
      shouldReconnect.current = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (wsRef.current) {
        try {
          wsRef.current.close(1000, "component unmount");
        } catch {}
        wsRef.current = null;
      }
    };
  }, [url]);

  return data;
}
