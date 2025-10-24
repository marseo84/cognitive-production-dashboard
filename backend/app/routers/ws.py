import asyncio
import random
import json
from datetime import datetime
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
                "ts": datetime.utcnow().isoformat() + "Z",
                "machine_id": 12,
                "temperature": round(60 + 20 * random.random(), 2),
                "vibration": round(0.1 + 1.5 * random.random(), 3),
                "speed": int(500 + 100 * random.random()),
                "fault_risk": round(random.random(), 3)
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
