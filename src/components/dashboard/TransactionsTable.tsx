import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { transactions, type TransactionStatus } from "@/lib/dashboard-data";

const PAGE_SIZE = 8;

const estadoStyles: Record<TransactionStatus, string> = {
  completado: "bg-success/10 text-success",
  pendiente: "bg-warning/10 text-warning",
  fallido: "bg-destructive/10 text-destructive",
};

const estadoDot: Record<TransactionStatus, string> = {
  completado: "bg-success",
  pendiente: "bg-warning",
  fallido: "bg-destructive",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function hue(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

const estadoLabel: Record<TransactionStatus, string> = {
  completado: "Completado",
  pendiente: "Pendiente",
  fallido: "Fallido",
};

export function TransactionsTable() {
  const [page, setPage] = useState(0);
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => (asc ? a.monto - b.monto : b.monto - a.monto)),
    [asc],
  );
  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const rows = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="card-glow df-lift rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Transacciones recientes</h2>
          <p className="text-sm text-muted-foreground">
            {transactions.length} operaciones este mes
          </p>
        </div>
        <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
          {(["completado", "pendiente", "fallido"] as TransactionStatus[]).map((e) => (
            <span key={e} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${estadoDot[e]}`} />
              {estadoLabel[e]} · {transactions.filter((t) => t.estado === e).length}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">ID</th>
              <th className="pb-3 pr-4 font-medium">Cliente</th>
              <th className="hidden pb-3 pr-4 font-medium md:table-cell">Producto</th>
              <th className="hidden pb-3 pr-4 font-medium sm:table-cell">Fecha</th>
              <th className="pb-3 pr-4 font-medium">
                <button
                  data-tour="sort"
                  onClick={() => setAsc(!asc)}
                  className="flex items-center gap-1 uppercase hover:text-foreground"
                >
                  Monto <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="pb-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody key={`${page}-${asc}`}>
            {rows.map((t, i) => (
              <tr
                key={t.id}
                className="df-row group border-b border-border/50 transition-colors last:border-0 hover:bg-primary/5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                <td className="py-3 pr-4">
                  <span className="flex items-center gap-3">
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white ring-2 ring-background"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.65 0.14 ${hue(t.cliente)}), oklch(0.5 0.12 ${(hue(t.cliente) + 40) % 360}))`,
                      }}
                    >
                      {initials(t.cliente)}
                    </span>
                    <span className="font-medium transition-colors group-hover:text-primary">
                      {t.cliente}
                    </span>
                  </span>
                </td>
                <td className="hidden py-3 pr-4 text-muted-foreground md:table-cell">
                  {t.producto}
                </td>
                <td className="hidden py-3 pr-4 text-muted-foreground sm:table-cell">{t.fecha}</td>
                <td className="py-3 pr-4 font-medium">${t.monto.toLocaleString()}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${estadoStyles[t.estado]}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${estadoDot[t.estado]}`} />
                    {estadoLabel[t.estado]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Página {page + 1} de {pageCount}
        </span>
        <div className="flex gap-2">
          <button
            data-tour="prev"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <button
            data-tour="next"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 transition-colors hover:bg-muted disabled:opacity-40"
          >
            Siguiente <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
