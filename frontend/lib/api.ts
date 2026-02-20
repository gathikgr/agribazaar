export async function predictPrice(payload: { crop_name: string; historical_prices: number[] }) {
  const response = await fetch("/api/ml/predict-price", { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function recommendCrop(payload: { location: string; soil: string; budget: number; season: string }) {
  const response = await fetch("/api/ml/recommend-crop", { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}

export async function storageDecision(payload: {
  current_price: number;
  predicted_price: number;
  storage_cost: number;
  spoilage_risk: number;
}) {
  const response = await fetch("/api/ml/storage-decision", { method: "POST", body: JSON.stringify(payload) });
  return response.json();
}
