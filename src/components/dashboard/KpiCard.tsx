import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowDownRight, ArrowUpRight, DollarSign, ShoppingCart, Users, Percent } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { Kpi } from "@/lib/dashboard-data";

const icons = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Percent,
};

/** Separa "$128,430" → prefijo "$", número 128430, sufijo "", 0 decimales. */
function parseValue(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const raw = m[2]!;
  const decimals = raw.includes(".") ? raw.split(".")[1]!.length : 0;
  return { prefix: m[1]!, num: parseFloat(raw.replace(/,/g, "")), suffix: m[3]!, decimals };
}

function useCountUp(target: number, delay: number, duration = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    const t = setTimeout(() => {
      const step = (now: number) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        setV(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, delay, duration]);
  return v;
}

export function KpiCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  const Icon = icons[kpi.icon];
  const positive = kpi.delta >= 0;
  const data = kpi.spark.map((v, i) => ({ i, v }));
  const color = positive ? "var(--color-primary)" : "var(--color-destructive)";

  const parsed = parseValue(kpi.value);
  const startAt = 1950 + index * 110;
  const current = useCountUp(parsed?.num ?? 0, startAt);
  const display = parsed
    ? `${parsed.prefix}${current.toLocaleString("en-US", {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })}${parsed.suffix}`
    : kpi.value;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className="card-glow df-border df-spot df-lift group rounded-2xl p-5"
      style={{ "--spin-delay": `${index * -1.5}s` } as CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-primary/10 p-2.5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_-4px_var(--color-primary)]">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="font-display text-2xl font-semibold tabular-nums tracking-tight">{display}</p>
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
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              fill={`url(#spark-${kpi.id})`}
              isAnimationActive
              animationBegin={startAt}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
