interface KPIProps {
  title: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export default function KPICard({ title, value, unit, color }: KPIProps) {
  return (
    <div
      className={`p-4 rounded shadow-md flex flex-col justify-center items-center ${
        color || "bg-white"
      }`}
    >
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-2xl font-bold">
        {value} {unit || ""}
      </span>
    </div>
  );
}
