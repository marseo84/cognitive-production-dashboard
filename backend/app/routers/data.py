from fastapi import APIRouter
from datetime import datetime, timedelta, UTC
import random


router = APIRouter()


@router.get("/kpi")
async def get_kpi(machine_id: int = 12):
    ts = datetime.now(UTC).isoformat().replace('+00:00', 'Z')

    return {
        "machine_id": machine_id,
        "timestamp": ts,
        "oee": round(random.uniform(70, 95), 1),
        "throughput": int(random.uniform(60, 120)),
        "fault_rate": round(random.uniform(0, 5), 2),
        "energy_kwh": round(random.uniform(100, 400), 1),
        "temperature": round(random.uniform(55, 75), 2)
    }


@router.get("/historical")
async def get_historical(machine_id: int = 12, hours: int = 24):
    now = datetime.now(UTC)
    data = []
    for i in range(hours * 4):
        t = now - timedelta(minutes=15 * i)
        data.append({
            "ts": t.isoformat().replace('+00:00', 'Z'),
            "oee": round(random.uniform(70, 95), 1),
            "throughput": int(random.uniform(60, 120)),
            "fault_rate": round(random.uniform(0, 5), 2),
            "energy_kwh": round(random.uniform(100, 400), 1),
            "temperature": round(random.uniform(55, 75), 2)
        })
    return {"machine_id": machine_id, "data": list(reversed(data))}
