import FiltersPanel from "./FiltersPanel";
import type { FilterConfig } from "./FiltersPanel";

interface DashboardFiltersProps {
  onFilterChange?: (filters: Record<string, string>) => void;
}

export default function DashboardFilters({
  onFilterChange,
}: DashboardFiltersProps) {
  const config: FilterConfig[] = [
    {
      id: "shift",
      label: "Shift",
      options: [
        { label: "All", value: "All" },
        { label: "Morning", value: "Morning" },
        { label: "Afternoon", value: "Afternoon" },
        { label: "Night", value: "Night" },
      ],
    },
    {
      id: "line",
      label: "Production Line",
      options: [
        { label: "All", value: "All" },
        { label: "Line A", value: "LineA" },
        { label: "Line B", value: "LineB" },
        { label: "Line C", value: "LineC" },
      ],
    },
    {
      id: "plant",
      label: "Plant",
      options: [
        { label: "All", value: "All" },
        { label: "Plant 1", value: "Plant1" },
        { label: "Plant 2", value: "Plant2" },
      ],
    },
  ];

  return (
    <FiltersPanel
      title="Dashboard Overview"
      config={config}
      onChange={onFilterChange}
    />
  );
}
