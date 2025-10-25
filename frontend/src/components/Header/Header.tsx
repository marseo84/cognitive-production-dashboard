import { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">
        Pro²Future Demo – Cognitive Analytics
      </h1>
      <div className="flex items-center gap-4">
        <span>{time.toLocaleString()}</span>
      </div>
      <button className="px-2 py-1 bg-gray-700-rounded hover:bg-gray-600">
        Toggle Theme
      </button>
    </header>
  );
}
