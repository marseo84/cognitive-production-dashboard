import asyncio
import random
import json
from datetime import datetime, UTC
from fastapi import APIRouter, WebSocket, WebSocketDisconnect


router = APIRouter()


@router.websocket("/live-data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket connection established.")

    try:
        while True:
            # Simulate live data
            msg = {
                "ts": datetime.now(UTC).isoformat().replace('+00:00', 'Z'),
                "machine_id": 12,
                "oee": round(random.uniform(70, 95), 1),
                "throughput": int(random.uniform(60, 120)),
                "fault_rate": round(random.uniform(0, 5), 2),
                "energy_kwh": round(random.uniform(100, 400), 1),
                "temperature": round(random.uniform(55, 75), 1)
            }

            # Send the data as JSON
            await websocket.send_text(json.dumps(msg))

            # Wait for 2 seconds before sending the next update
            await asyncio.sleep(2.0)

    except WebSocketDisconnect:
        print("WebSocket client disconnected.")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    finally:
        # Ensure the WebSocket is closed properly
        await websocket.close()
