import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthlySales } from "@/lib/dashboard-data";

export function SalesChart() {
  return (
    <div className="card-glow rounded-2xl p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Ventas mensuales</h2>
          <p className="text-sm text-muted-foreground">Ventas vs objetivo · 2026</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chart-1" /> Ventas
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chart-4" /> Objetivo
          </span>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlySales} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`]}
            />
            <Line type="monotone" dataKey="ventas" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="objetivo" stroke="var(--color-chart-4)" strokeWidth={2} strokeDasharray="6 6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
