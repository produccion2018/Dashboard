import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { categoryDistribution } from "@/lib/dashboard-data";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export function CategoryPie() {
  return (
    <div className="card-glow df-lift rounded-2xl p-5">
      <h2 className="font-display text-lg font-semibold">Distribución por categoría</h2>
      <p className="text-sm text-muted-foreground">Participación en ventas</p>
      <div className="relative mt-2 h-56">
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-gradient">5</span>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">categorías</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={3}
              cornerRadius={6}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
              animationBegin={2500}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {categoryDistribution.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} className="outline-none transition-opacity hover:opacity-80" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
              }}
              formatter={(value) => [`${value}%`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-2">
        {categoryDistribution.map((c, i) => (
          <li key={c.name} className="group text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {c.name}
              </span>
              <span className="font-medium tabular-nums">{c.value}%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted/60">
              <div
                className="df-bar h-full rounded-full"
                style={{
                  width: `${c.value}%`,
                  backgroundColor: COLORS[i % COLORS.length],
                  animationDelay: `${2.6 + i * 0.12}s`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
