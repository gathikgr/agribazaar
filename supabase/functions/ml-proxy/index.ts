// Supabase Edge Function: ML proxy example
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const payload = await req.json();
  const response = await fetch(`${Deno.env.get("ML_SERVICE_URL")}/predict-price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return new Response(await response.text(), {
    headers: { "Content-Type": "application/json" },
    status: response.status
  });
});
