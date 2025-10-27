import { useState, useEffect } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterPanelProps {
  title?: string;
  config: FilterConfig[];
  initialValues?: Record<string, string>;
  onChange?: (filters: Record<string, string>) => void;
}

export default function FiltersPanel({
  title = "Filters",
  config,
  initialValues = {},
  onChange,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    config.forEach((f) => {
      defaults[f.id] = initialValues[f.id] ?? f.options[0]?.value ?? "";
    });
    return defaults;
  });

  useEffect(() => {
    onChange?.(filters);
  }, [filters]);

  const handleChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}
      <div className="flex gap-3 flex-wrap">
        {config.map((filter) => (
          <div key={filter.id} className="flex flex-col">
            <label
              htmlFor={filter.id}
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              {filter.label}
            </label>
            <select
              id={filter.id}
              className="border rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
              value={filters[filter.id]}
              onChange={(e) => handleChange(filter.id, e.target.value)}
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
