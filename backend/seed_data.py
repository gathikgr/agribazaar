from __future__ import annotations

SEED_LISTINGS = [
    {
        "id": 1,
        "crop_name": "Wheat",
        "farmer_id": "farmer_1",
        "optimal_harvest_time": "2026-03-18",
        "quantity_tons": 28,
        "quality_grade": "A",
        "price_per_ton": 22000,
        "storage_location": "Nashik, Maharashtra",
        "location": "Nashik",
        "photos": ["https://images.unsplash.com/photo-1534313314376-a72289b6181e"],
        "quality_score": 89,
        "trust_score": 84,
    },
    {
        "id": 2,
        "crop_name": "Rice",
        "farmer_id": "farmer_2",
        "optimal_harvest_time": "2026-02-11",
        "quantity_tons": 40,
        "quality_grade": "A+",
        "price_per_ton": 31000,
        "storage_location": "Guntur, Andhra Pradesh",
        "location": "Guntur",
        "photos": ["https://images.unsplash.com/photo-1536053291868-8d00cb09f7df"],
        "quality_score": 93,
        "trust_score": 88,
    },
    {
        "id": 3,
        "crop_name": "Maize",
        "farmer_id": "farmer_3",
        "optimal_harvest_time": "2026-04-28",
        "quantity_tons": 22,
        "quality_grade": "B+",
        "price_per_ton": 18000,
        "storage_location": "Indore, Madhya Pradesh",
        "location": "Indore",
        "photos": ["https://images.unsplash.com/photo-1464226184884-fa280b87c399"],
        "quality_score": 81,
        "trust_score": 77,
    },
]

SEED_STORAGE_PROVIDERS = [
    {
        "id": "storage_1",
        "name": "GreenVault Logistics",
        "location": "Nashik",
        "capacity_tons": 600,
        "pricing_per_ton": 780,
        "supported_crops": ["Wheat", "Rice", "Maize"],
        "availability": "Available",
    },
    {
        "id": "storage_2",
        "name": "AgroCool Storage",
        "location": "Guntur",
        "capacity_tons": 840,
        "pricing_per_ton": 920,
        "supported_crops": ["Rice", "Cotton"],
        "availability": "Limited",
    },
]

SEED_REVIEWS = {
    "farmer_1": [4, 5, 5, 4],
    "farmer_2": [5, 5, 4, 5],
    "farmer_3": [3, 4, 4],
}
