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

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary/15 p-2 text-primary">
              <Activity className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              Data<span className="text-gradient">Flow</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground sm:flex">
              <Search className="h-4 w-4" />
              <input
                placeholder="Buscar…"
                className="w-36 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="relative rounded-lg border bg-card p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 font-display text-sm font-semibold text-primary">
              AX
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Panel Ejecutivo</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              Datos en tiempo real · Última actualización hace 2 min
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            {["Hoy", "7 días", "30 días", "Año"].map((r, i) => (
              <button
                key={r}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  i === 2
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SalesChart />
          <CategoryPie />
        </section>

        {/* Table */}
        <TransactionsTable />
      </main>
    </div>
  );
}
