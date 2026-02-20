from __future__ import annotations

from typing import Literal

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from ml_service import AgrilinkPredictor, PredictionInput
from seed_data import SEED_LISTINGS, SEED_REVIEWS, SEED_STORAGE_PROVIDERS

Role = Literal["Farmer", "Buyer", "Storage Provider"]
app = FastAPI(title="AgriLink API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = AgrilinkPredictor()
users: list[dict] = []
marketplace_listings = SEED_LISTINGS.copy()
storage_profiles = SEED_STORAGE_PROVIDERS.copy()
storage_bids: list[dict] = []


class SignupPayload(BaseModel):
    role: Role
    phone: str
    otp: str
    profile: dict = Field(default_factory=dict)


class CropListingPayload(BaseModel):
    farmer_id: str
    crop_name: str
    optimal_harvest_time: str
    quantity_tons: float
    quality_grade: str
    price_per_ton: float
    storage_location: str
    location: str
    photos: list[str] = Field(default_factory=list)


class StorageNeedPayload(BaseModel):
    farmer_id: str
    crop_name: str
    required_tons: float
    duration_days: int
    location: str


class StorageBidPayload(BaseModel):
    storage_provider_id: str
    storage_need_id: int
    bid_price_per_ton: float
    notes: str = ""


class ProfitPayload(BaseModel):
    expected_yield_tons: float
    expected_price_per_ton: float
    fixed_costs: float
    variable_costs: float


class PredictionPayload(BaseModel):
    crop_type: str
    location_score: float
    season_score: float
    historical_price: float
    weather_index: float


def compute_trust_score(user_id: str, verification_level: int = 4, completed_transactions: int = 12, dispute_history: int = 1,
                        payment_reliability: int = 88, quality_consistency: int = 84) -> float:
    reviews = SEED_REVIEWS.get(user_id, [4, 4, 5])
    review_score = (sum(reviews) / len(reviews)) * 20
    raw = (
        verification_level * 12
        + min(completed_transactions, 40)
        + review_score * 0.18
        - dispute_history * 6
        + payment_reliability * 0.22
        + quality_consistency * 0.2
    )
    return round(max(0, min(raw, 100)), 2)


def validate_role_profile(role: Role, profile: dict) -> tuple[bool, list[str]]:
    required: dict[Role, list[str]] = {
        "Farmer": [
            "name",
            "gps_location",
            "crops_grown",
            "years_of_experience",
            "bank_account",
            "languages",
            "kisan_pehchaan_patra_url",
        ],
        "Buyer": [
            "business_name",
            "fssai_license_url",
            "purchase_capacity",
            "preferred_crops",
        ],
        "Storage Provider": [
            "location",
            "storage_capacity",
            "license_upload_url",
            "government_certification",
        ],
    }
    missing = [key for key in required[role] if key not in profile]
    return len(missing) == 0, missing


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "AgriLink API online"}


@app.post("/auth/signup")
def signup(payload: SignupPayload) -> dict:
    valid, missing = validate_role_profile(payload.role, payload.profile)
    if not valid:
        return {"error": "Missing required profile fields", "missing_fields": missing}
    user = {"id": f"user_{len(users) + 1}", **payload.model_dump()}
    user["trust_score"] = compute_trust_score(user["id"])
    users.append(user)
    return user


@app.get("/dashboard/{role}")
def dashboard(role: Role) -> dict:
    shared = {
        "ai_insights": predictor.predict(PredictionInput("Wheat", 7.2, 3.0, 22000, 0.74)),
        "marketplace_snapshot": marketplace_listings[:3],
    }
    if role == "Farmer":
        return {
            **shared,
            "yield_analytics": [24, 27, 29, 31],
            "profit_estimator": {"revenue": 620000, "profit": 218000},
            "storage_requests": storage_bids,
            "transport_availability": True,
            "orders": [{"id": "O-102", "status": "In transit"}],
        }
    if role == "Buyer":
        return {
            **shared,
            "market_projections": [21200, 21800, 22600, 23000],
            "price_trends": [20500, 21400, 22300, 22750],
            "sample_requests": [{"listing_id": 2, "status": "Pending"}],
            "delivery_status": [{"order_id": "O-92", "status": "Out for delivery"}],
        }
    return {
        **shared,
        "capacity_overview": storage_profiles,
        "active_bids": storage_bids,
    }


@app.get("/marketplace")
def marketplace(
    crop_type: str | None = Query(default=None),
    location: str | None = Query(default=None),
    min_price: float | None = Query(default=None),
    max_price: float | None = Query(default=None),
    quality_grade: str | None = Query(default=None),
    min_trust_score: float | None = Query(default=None),
) -> list[dict]:
    filtered = marketplace_listings
    if crop_type:
        filtered = [item for item in filtered if item["crop_name"].lower() == crop_type.lower()]
    if location:
        filtered = [item for item in filtered if location.lower() in item["location"].lower()]
    if min_price is not None:
        filtered = [item for item in filtered if item["price_per_ton"] >= min_price]
    if max_price is not None:
        filtered = [item for item in filtered if item["price_per_ton"] <= max_price]
    if quality_grade:
        filtered = [item for item in filtered if item["quality_grade"].lower() == quality_grade.lower()]
    if min_trust_score is not None:
        filtered = [item for item in filtered if item["trust_score"] >= min_trust_score]
    return filtered


@app.post("/farmer/listings")
def create_listing(payload: CropListingPayload) -> dict:
    listing = payload.model_dump()
    listing.update(
        {
            "id": len(marketplace_listings) + 1,
            "quality_score": 80,
            "trust_score": compute_trust_score(payload.farmer_id),
        }
    )
    marketplace_listings.append(listing)
    return listing


@app.post("/storage/needs")
def create_storage_need(payload: StorageNeedPayload) -> dict:
    need = payload.model_dump()
    need["id"] = len(storage_bids) + 1
    need["bids"] = []
    storage_bids.append(need)
    return need


@app.post("/storage/bids")
def place_storage_bid(payload: StorageBidPayload) -> dict:
    bid = payload.model_dump()
    bid["id"] = len(storage_bids) + 100
    for need in storage_bids:
        if need["id"] == payload.storage_need_id:
            need["bids"].append(bid)
            return bid
    return {"error": "Storage need not found"}


@app.get("/transport/options")
def transport_options() -> list[dict]:
    return [
        {"farmer_id": "farmer_1", "provides_transport": True, "trucks": 4, "drivers": 5},
        {"farmer_id": "farmer_3", "provides_transport": False, "third_party_available": True},
    ]


@app.post("/analytics/profit")
def profit_analytics(payload: ProfitPayload) -> dict:
    revenue = payload.expected_yield_tons * payload.expected_price_per_ton
    total_cost = payload.fixed_costs + payload.variable_costs
    profit = revenue - total_cost
    margin = (profit / revenue * 100) if revenue else 0
    return {
        "projected_revenue": round(revenue, 2),
        "projected_profit": round(profit, 2),
        "margin_percent": round(margin, 2),
        "series": [round(revenue * f, 2) for f in [0.25, 0.5, 0.75, 1]],
    }


@app.post("/ai/predict")
def ai_predict(payload: PredictionPayload) -> dict[str, float]:
    return predictor.predict(PredictionInput(**payload.model_dump()))
