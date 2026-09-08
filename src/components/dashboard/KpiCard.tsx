import { ArrowDownRight, ArrowUpRight, DollarSign, ShoppingCart, Users, Percent } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { Kpi } from "@/lib/dashboard-data";

const icons = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Percent,
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = icons[kpi.icon];
  const positive = kpi.delta >= 0;
  const data = kpi.spark.map((v, i) => ({ i, v }));

  return (
    <div className="card-glow rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="font-display text-2xl font-semibold tracking-tight">{kpi.value}</p>
          </div>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
      <div className="mt-4 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <defs>
              <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={positive ? "var(--color-primary)" : "var(--color-destructive)"} stopOpacity={0.35} />
                <stop offset="100%" stopColor={positive ? "var(--color-primary)" : "var(--color-destructive)"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={positive ? "var(--color-primary)" : "var(--color-destructive)"}
              strokeWidth={2}
              fill={`url(#spark-${kpi.id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
