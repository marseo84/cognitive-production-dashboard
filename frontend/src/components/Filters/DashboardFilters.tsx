import { useState } from "react";

interface DashboardFiltersProps {
  onFilterChange?: (filters: {
    shift: string;
    line: string;
    plant: string;
  }) => void;
}
export default function DashboardFilters({
  onFilterChange,
}: DashboardFiltersProps) {
  const [filters, setFilters] = useState({
    shift: "All",
    line: "All",
    plant: "All",
  });

  const handleChange = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Dashboard Overview
      </h2>

      <div className="flex gap-">
        <select
          className="border rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
          value={filters.shift}
          onChange={(e) => handleChange("shift", e.target.value)}
        >
          <option>All</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Night</option>
        </select>

        <select
          className="border rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
          value={filters.line}
          onChange={(e) => handleChange("line", e.target.value)}
        >
          <option>All</option>
          <option>Line A</option>
          <option>Line B</option>
          <option>Line C</option>
        </select>

        <select
          className="border rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
          value={filters.plant}
          onChange={(e) => handleChange("plant", e.target.value)}
        >
          <option>All</option>
          <option>Plant 1</option>
          <option>Plant 2</option>
        </select>
      </div>
    </div>
  );
}
