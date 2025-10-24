from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_kpi():
    res = client.get("/api/kpi")
    assert res.status_code == 200
    data = res.json()
    assert "oee" in data
