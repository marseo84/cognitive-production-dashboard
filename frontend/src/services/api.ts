const API_BASE = "http://localhost:8000/api";

export async function fetchKPI(machineId = 12) {
  const response = await fetch(`${API_BASE}/kpi?machine_id=${machineId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch KPI data");
  }
  return response.json();
}

// export async function fetchHistorical(machineId = 12, hours = 24) {
//   const response = await fetch(
//     `${API_BASE}/historical?machine_id=${machineId}&hours=${hours}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch historical data");
//   }
//   return response.json();
// }

// debug fetchHistorical

export async function fetchHistorical(machineId = 12, hours = 24) {
  const url = `http://localhost:8000/api/historical?machine_id=${machineId}&hours=${hours}`;
  console.log("Fetching:", url);

  const response = await fetch(url);

  const text = await response.text();
  console.log("Raw response:", text);

  if (!response.ok) {
    throw new Error(`Failed to fetch historical data:${response.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    throw new Error("Failed to parse historical data");
  }
}
