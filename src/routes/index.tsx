import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  Download,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { kpis, monthlySales } from "@/lib/dashboard-data";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { CategoryPie } from "@/components/dashboard/CategoryPie";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DataFlow — Dashboard Ejecutivo de Métricas en Tiempo Real" },
      {
        name: "description",
        content:
          "DataFlow: panel ejecutivo con KPIs, ventas mensuales, distribución por categoría y transacciones recientes en tiempo real.",
      },
      { property: "og:title", content: "DataFlow — Dashboard Ejecutivo" },
      {
        property: "og:description",
        content: "Métricas clave de negocio visualizadas en gráficos interactivos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const d = (n: number) => ({ "--d": n }) as CSSProperties;

function Intro() {
  return (
    <div className="df-intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <span className="df-intro-logo rounded-2xl bg-primary/15 p-4 text-primary shadow-[0_0_60px_-10px_var(--color-primary)]">
          <Activity className="h-10 w-10" />
        </span>
        <span className="font-display text-4xl font-bold tracking-tight">
          {"DataFlow".split("").map((ch, i) => (
            <span
              key={i}
              className={`df-letter ${i >= 4 ? "text-primary" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              {ch}
            </span>
          ))}
        </span>
        <div className="df-intro-bar">
          <span />
        </div>
      </div>
    </div>
  );
}

const SIDE = [
  { icon: LayoutDashboard, label: "Panel" },
  { icon: BarChart3, label: "Reportes" },
  { icon: Users, label: "Clientes" },
  { icon: ShoppingCart, label: "Órdenes" },
  { icon: Settings, label: "Ajustes" },
];

function Sidebar() {
  return (
    <aside
      className="df-rise fixed inset-y-0 left-0 z-20 hidden w-20 flex-col items-center gap-3 border-r bg-background/60 py-5 backdrop-blur-xl lg:flex"
      style={d(0)}
    >
      <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-[0_0_30px_-6px_var(--color-primary)]">
        <Activity className="h-5 w-5" />
      </span>
      {SIDE.map(({ icon: Icon, label }, i) => (
        <button
          key={label}
          title={label}
          className={`group relative grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 ${
            i === 0
              ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_oklch(0.75_0.14_195/0.35)]"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          {i === 0 && <span className="absolute -left-[18px] h-6 w-1 rounded-r-full bg-primary" />}
          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </aside>
  );
}

/** Banner principal con datos calculados de las ventas del año. */
function YearBanner() {
  const total = monthlySales.reduce((a, m) => a + m.ventas, 0);
  const goal = monthlySales.reduce((a, m) => a + m.objetivo, 0);
  const pct = Math.round((total / goal) * 100);
  const best = monthlySales.reduce((a, m) => (m.ventas > a.ventas ? m : a));
  const max = best.ventas;
  const R = 52;
  const C = 2 * Math.PI * R;
  const fill = Math.min(pct, 100) / 100;

  return (
    <section
      className="df-rise df-border relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-card to-chart-3/10 p-6 sm:p-8"
      style={d(2)}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_auto_1fr]">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Resumen 2026
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Ventas acumuladas del año</p>
          <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            ${total.toLocaleString("en-US")}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <TrendingUp className="h-3.5 w-3.5" />
            +${(total - goal).toLocaleString("en-US")} sobre el objetivo
          </p>
        </div>

        <div className="relative mx-auto grid h-36 w-36 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-chart-2)" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              className="df-ring"
              style={{ "--ring-off": `${C * (1 - fill)}`, "--ring-full": `${C}` } as CSSProperties}
            />
          </svg>
          <div className="text-center">
            <p className="font-display text-3xl font-bold">{pct}%</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              del objetivo
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-end gap-1.5" style={{ height: 96 }}>
            {monthlySales.map((m, i) => (
              <div key={m.month} className="group relative flex-1" style={{ height: "100%" }}>
                <div
                  className={`df-col absolute bottom-0 w-full rounded-t-md ${
                    m === best
                      ? "bg-gradient-to-t from-primary to-chart-2"
                      : "bg-primary/25 group-hover:bg-primary/50"
                  }`}
                  style={{
                    height: `${(m.ventas / max) * 100}%`,
                    animationDelay: `${2.1 + i * 0.05}s`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Ene → Dic</span>
            <span>
              Mejor mes: <span className="font-semibold text-foreground">{best.month}</span> · $
              {best.ventas.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Recorrido automático (?tour=1, lo usa el portfolio) ─────────
   Ejecuta un paso cada `interval` ms. Si el usuario hace clic, scroll o toca la
   pantalla, se pausa y retoma solo después de unos segundos sin actividad. */
function useDemoTour(steps: Array<() => void>, interval = 3800, startDelay = 2600) {
  const [active, setActive] = useState(false);
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("tour")) return;
    setActive(true);
    let i = 0;
    let paused = false;
    let idle = 0;
    let timer = 0;
    const onUser = () => {
      paused = true;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (paused = false), 9000);
    };
    const evs = ["wheel", "touchstart", "mousedown", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, onUser, { passive: true }));
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (paused) return;
        const list = stepsRef.current;
        list[i % list.length]?.();
        i++;
      }, interval);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
      window.clearTimeout(idle);
      evs.forEach((e) => window.removeEventListener(e, onUser));
    };
  }, [interval, startDelay]);

  return active;
}

const goTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 90,
    behavior: "smooth",
  });
};
const clickTour = (name: string) =>
  document.querySelector<HTMLButtonElement>(`[data-tour="${name}"]:not(:disabled)`)?.click();

function Dashboard() {
  const [range, setRange] = useState(2);

  const touring = useDemoTour([
    () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setRange(0);
    },
    () => setRange(1),
    () => setRange(3),
    () => goTo("df-kpis"),
    () => goTo("df-charts"),
    () => goTo("df-table"),
    () => clickTour("next"),
    () => clickTour("next"),
    () => clickTour("sort"),
    () => {
      clickTour("prev");
      window.setTimeout(() => clickTour("prev"), 300);
      window.setTimeout(() => clickTour("prev"), 600);
      setRange(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  ]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Intro />
      {touring && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur-xl">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary align-middle" />
          Recorrido automático · tocá o deslizá para explorar
        </div>
      )}

      {/* Fondo animado */}
      <div className="df-grid" />
      <div className="df-aurora">
        <span
          style={{
            top: "-10%",
            left: "-5%",
            width: "45vw",
            height: "45vw",
            background: "var(--color-primary)",
          }}
        />
        <span
          style={{
            top: "20%",
            right: "-10%",
            width: "40vw",
            height: "40vw",
            background: "var(--color-chart-3)",
            animationDelay: "-7s",
          }}
        />
        <span
          style={{
            bottom: "-15%",
            left: "30%",
            width: "35vw",
            height: "35vw",
            background: "var(--color-chart-2)",
            animationDelay: "-13s",
          }}
        />
      </div>

      <Sidebar />

      <div className="lg:pl-20">
        {/* Topbar */}
        <header
          className="df-rise sticky top-0 z-10 border-b bg-background/70 backdrop-blur-xl"
          style={d(0)}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="group flex items-center gap-3">
              <span className="rounded-xl bg-primary/15 p-2 text-primary transition-transform duration-500 group-hover:rotate-[360deg]">
                <Activity className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Data<span className="text-gradient">Flow</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-lg border bg-card/60 px-3 py-2 text-sm text-muted-foreground transition-all focus-within:border-primary/60 focus-within:shadow-[0_0_20px_-6px_var(--color-primary)] sm:flex">
                <Search className="h-4 w-4" />
                <input
                  placeholder="Buscar…"
                  className="w-36 bg-transparent outline-none transition-all focus:w-48 placeholder:text-muted-foreground"
                />
              </div>
              <button className="relative rounded-lg border bg-card/60 p-2 text-muted-foreground transition-colors hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="df-live absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-chart-3/40 font-display text-sm font-semibold text-foreground ring-1 ring-primary/30">
                AX
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-[1] mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
          {/* Heading */}
          <div className="df-rise flex flex-wrap items-end justify-between gap-4" style={d(1)}>
            <div>
              <h1 className="df-shimmer font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Panel Ejecutivo
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="df-live h-2 w-2 rounded-full bg-success" />
                Datos en tiempo real · Última actualización hace 2 min
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1 rounded-xl border bg-card/60 p-1 text-sm backdrop-blur">
                {["Hoy", "7 días", "30 días", "Año"].map((r, i) => (
                  <button
                    key={r}
                    onClick={() => setRange(i)}
                    className={`rounded-lg px-3 py-1.5 transition-all duration-300 ${
                      i === range
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-chart-2 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_var(--color-primary)] transition-transform hover:-translate-y-0.5">
                <Download className="h-4 w-4" /> Exportar
              </button>
            </div>
          </div>

          <YearBanner />

          {/* KPIs */}
          <section id="df-kpis" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi, i) => (
              <div key={kpi.id} className="df-rise" style={d(3 + i)}>
                <KpiCard kpi={kpi} index={i} />
              </div>
            ))}
          </section>

          {/* Charts */}
          <section
            id="df-charts"
            className="df-rise grid grid-cols-1 gap-4 lg:grid-cols-3"
            style={d(7)}
          >
            <SalesChart />
            <CategoryPie />
          </section>

          {/* Table */}
          <div id="df-table" className="df-rise" style={d(8)}>
            <TransactionsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
