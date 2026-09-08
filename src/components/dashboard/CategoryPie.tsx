import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { categoryDistribution } from "@/lib/dashboard-data";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export function CategoryPie() {
  return (
    <div className="card-glow rounded-2xl p-5">
      <h2 className="font-display text-lg font-semibold">Distribución por categoría</h2>
      <p className="text-sm text-muted-foreground">Participación en ventas</p>
      <div className="mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              strokeWidth={0}
            >
              {categoryDistribution.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
              }}
              formatter={(value: number | string | undefined) => [`${value}%`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 space-y-2">
        {categoryDistribution.map((c, i) => (
          <li key={c.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              {c.name}
            </span>
            <span className="font-medium">{c.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
