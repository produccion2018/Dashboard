import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { transactions, type TransactionStatus } from "@/lib/dashboard-data";

const PAGE_SIZE = 8;

const estadoStyles: Record<TransactionStatus, string> = {
  completado: "bg-success/10 text-success",
  pendiente: "bg-warning/10 text-warning",
  fallido: "bg-destructive/10 text-destructive",
};

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
    [asc]
  );
  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const rows = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="card-glow rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Transacciones recientes</h2>
          <p className="text-sm text-muted-foreground">{transactions.length} operaciones este mes</p>
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
                <button onClick={() => setAsc(!asc)} className="flex items-center gap-1 uppercase hover:text-foreground">
                  Monto <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="pb-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                <td className="py-3 pr-4 font-medium">{t.cliente}</td>
                <td className="hidden py-3 pr-4 text-muted-foreground md:table-cell">{t.producto}</td>
                <td className="hidden py-3 pr-4 text-muted-foreground sm:table-cell">{t.fecha}</td>
                <td className="py-3 pr-4 font-medium">${t.monto.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${estadoStyles[t.estado]}`}>
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
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <button
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
