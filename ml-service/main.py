from __future__ import annotations

from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AgriSync ML Service", version="1.0.0")


class PredictPriceInput(BaseModel):
    crop_name: str
    historical_prices: list[float]


class RecommendCropInput(BaseModel):
    location: str
    soil: str
    budget: float
    season: str


class StorageDecisionInput(BaseModel):
    current_price: float
    predicted_price: float
    storage_cost: float
    spoilage_risk: float


@app.get("/")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/predict-price")
def predict_price(payload: PredictPriceInput) -> dict[str, list[float]]:
    base = payload.historical_prices[-1] if payload.historical_prices else 1000
    next_7 = [round(base * (1 + 0.01 * (i + 1)), 2) for i in range(7)]
    next_14 = [round(base * (1 + 0.008 * (i + 1)), 2) for i in range(14)]
    return {"next_7_days_forecast": next_7, "next_14_days_forecast": next_14}


@app.post("/recommend-crop")
def recommend_crop(payload: RecommendCropInput) -> dict[str, object]:
    options = ["Wheat", "Maize", "Groundnut"] if payload.soil.lower() == "loamy" else ["Rice", "Cotton", "Millet"]
    factor = 1.35 if payload.season.lower() in {"rabi", "winter"} else 1.18
    return {"top_3_crops": options, "expected_profit": round(payload.budget * factor, 2)}


@app.post("/storage-decision")
def storage_decision(payload: StorageDecisionInput) -> dict[str, float | Literal["Sell Now", "Store"]]:
    future_net = payload.predicted_price - payload.storage_cost - payload.spoilage_risk
    current_net = payload.current_price
    recommendation: Literal["Sell Now", "Store"] = "Store" if future_net > current_net else "Sell Now"
    return {
        "recommendation": recommendation,
        "estimated_profit_difference": round(future_net - current_net, 2),
    }
