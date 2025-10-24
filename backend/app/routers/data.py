from fastapi import APIRouter
from datetime import datetime, timedelta, UTC
import random


router = APIRouter()


@router.get("/kpi")
async def get_kpi(machine_id: int = 12):
    current_ts = datetime.now(UTC).isoformat().replace('+00:00', 'Z')

    return {
        "machine_id": machine_id,
        "oee": round(random.uniform(70, 95), 1),
        "throughput": int(random.uniform(50, 120)),
        "fault_rate": round(random.uniform(0, 5), 2),
        "energy_kwh": round(random.uniform(100, 400), 1),
        "timestamp": current_ts
    }


@router.get("/historical")
async def get_historical(machine_id: int = 12, hours: int = 24):
    now = datetime.now(UTC)
    data = []
    for i in range(hours * 4):
        t = now - timedelta(minutes=15 * i)
        data.append({
            "ts": t.isoformat().replace('+00:00', 'Z'),
            "throughput": int(70 + 20 * random.uniform(0.8, 1.2)),
            "temperature": round(60 + 10 * random.uniform(-1, 1), 1)
        })
    return {"machine_id": machine_id, "data": list(reversed(data))}
