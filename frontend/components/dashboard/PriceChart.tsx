"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const points = [
  { day: "D1", price: 2100 },
  { day: "D2", price: 2150 },
  { day: "D3", price: 2210 },
  { day: "D4", price: 2190 },
  { day: "D5", price: 2260 },
  { day: "D6", price: 2320 },
  { day: "D7", price: 2350 }
];

export function PriceChart() {
  return (
    <div className="h-64 rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
