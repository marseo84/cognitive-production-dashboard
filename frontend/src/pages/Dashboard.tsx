import KPIcard from "../components/KPI/KPIcard";

<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
  <KPIcard title="OEE" value="92" unit="%" color="bg-green-300" />
  <KPIcard title="Throughput" value="120" unit="units/h" color="bg-blue-300" />
  <KPIcard title="Fault Rate" value="2" unit="%" color="bg-red-300" />
  <KPIcard title="Energy" value="350" unit="kWh" color="bg-yellow-300" />
</div>;
