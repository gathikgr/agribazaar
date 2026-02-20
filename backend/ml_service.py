from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from sklearn.ensemble import RandomForestRegressor


@dataclass
class PredictionInput:
    crop_type: str
    location_score: float
    season_score: float
    historical_price: float
    weather_index: float


class AgrilinkPredictor:
    def __init__(self) -> None:
        self.price_model = RandomForestRegressor(n_estimators=80, random_state=42)
        self.yield_model = RandomForestRegressor(n_estimators=80, random_state=42)
        self.crop_encoding = {"Wheat": 1.0, "Rice": 2.0, "Maize": 3.0, "Cotton": 4.0}
        self._train_models()

    def _train_models(self) -> None:
        X = np.array(
            [
                [1, 7.1, 3, 21000, 0.72],
                [2, 7.9, 2, 28000, 0.88],
                [3, 6.2, 4, 17000, 0.65],
                [4, 6.5, 1, 51000, 0.55],
                [1, 7.4, 2, 22500, 0.77],
                [2, 8.1, 3, 30500, 0.86],
                [3, 6.0, 1, 16000, 0.69],
                [4, 6.8, 4, 53500, 0.58],
            ]
        )
        y_price = np.array([22200, 30000, 18200, 52000, 23100, 31500, 17500, 54000])
        y_yield = np.array([27, 41, 24, 18, 29, 44, 23, 20])

        self.price_model.fit(X, y_price)
        self.yield_model.fit(X, y_yield)

    def predict(self, payload: PredictionInput) -> dict[str, float]:
        crop_encoded = self.crop_encoding.get(payload.crop_type, 1.0)
        sample = np.array(
            [[crop_encoded, payload.location_score, payload.season_score, payload.historical_price, payload.weather_index]]
        )
        return {
            "predicted_price": float(self.price_model.predict(sample)[0]),
            "predicted_yield_tons": float(self.yield_model.predict(sample)[0]),
        }
