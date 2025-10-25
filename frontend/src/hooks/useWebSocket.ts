import { useEffect, useState } from "react";

export default function useWebSocket(url: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => console.log("✅ Connected to WebSocket", url);
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    ws.onerror = (err) => console.error("❌ WebSocket error:", err);
    ws.onclose = () => console.log("🔌 WebSocket disconnected");

    return () => ws.close();
  }, [url]);

  return data;
}
