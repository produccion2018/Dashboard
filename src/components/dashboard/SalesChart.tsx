import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthlySales } from "@/lib/dashboard-data";

export function SalesChart() {
  return (
    <div className="card-glow df-lift flex flex-col rounded-2xl p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Ventas mensuales</h2>
          <p className="text-sm text-muted-foreground">Ventas vs objetivo · 2026</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="df-live h-2 w-2 rounded-full bg-chart-1" /> Ventas
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-chart-4" /> Objetivo
          </span>
        </div>
      </div>
      <div className="h-72 flex-1 lg:h-auto lg:min-h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthlySales} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
              <filter id="sales-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v / 1000}k`} />
            <Tooltip
              cursor={{ stroke: "var(--color-primary)", strokeOpacity: 0.3, strokeWidth: 1 }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
                boxShadow: "0 10px 30px oklch(0 0 0 / 40%)",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`]}
            />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="var(--color-chart-1)"
              strokeWidth={2.5}
              fill="url(#sales-fill)"
              filter="url(#sales-glow)"
              activeDot={{ r: 5, strokeWidth: 0, fill: "var(--color-chart-1)" }}
              animationBegin={2400}
              animationDuration={1800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="objetivo"
              stroke="var(--color-chart-4)"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
              animationBegin={2700}
              animationDuration={1600}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
