import { useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Bell, Search } from "lucide-react";
import { kpis } from "@/lib/dashboard-data";
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

function Dashboard() {
  const [range, setRange] = useState(2);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Intro />

      {/* Fondo animado */}
      <div className="df-grid" />
      <div className="df-aurora">
        <span
          style={{ top: "-10%", left: "-5%", width: "45vw", height: "45vw", background: "var(--color-primary)" }}
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

      {/* Topbar */}
      <header className="df-rise sticky top-0 z-10 border-b bg-background/70 backdrop-blur-xl" style={d(0)}>
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
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi, i) => (
            <div key={kpi.id} className="df-rise" style={d(2 + i)}>
              <KpiCard kpi={kpi} index={i} />
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="df-rise grid grid-cols-1 gap-4 lg:grid-cols-3" style={d(6)}>
          <SalesChart />
          <CategoryPie />
        </section>

        {/* Table */}
        <div className="df-rise" style={d(7)}>
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}
