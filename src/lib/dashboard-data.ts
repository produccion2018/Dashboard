export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: number;
  icon: "revenue" | "users" | "orders" | "conversion";
  spark: number[];
}

export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Ingresos totales",
    value: "$128,430",
    delta: 12.5,
    icon: "revenue",
    spark: [42, 48, 45, 56, 61, 58, 72, 78, 84],
  },
  {
    id: "users",
    label: "Usuarios activos",
    value: "8,742",
    delta: 8.1,
    icon: "users",
    spark: [30, 34, 38, 36, 44, 49, 47, 55, 60],
  },
  {
    id: "orders",
    label: "Órdenes",
    value: "2,315",
    delta: -3.2,
    icon: "orders",
    spark: [60, 55, 58, 50, 52, 47, 45, 42, 40],
  },
  {
    id: "conversion",
    label: "Tasa de conversión",
    value: "4.6%",
    delta: 1.8,
    icon: "conversion",
    spark: [22, 25, 24, 29, 31, 30, 34, 36, 39],
  },
];

export const monthlySales = [
  { month: "Ene", ventas: 4200, objetivo: 4000 },
  { month: "Feb", ventas: 5100, objetivo: 4400 },
  { month: "Mar", ventas: 4800, objetivo: 4800 },
  { month: "Abr", ventas: 6300, objetivo: 5200 },
  { month: "May", ventas: 5900, objetivo: 5600 },
  { month: "Jun", ventas: 7200, objetivo: 6000 },
  { month: "Jul", ventas: 8100, objetivo: 6500 },
  { month: "Ago", ventas: 7600, objetivo: 7000 },
  { month: "Sep", ventas: 8900, objetivo: 7500 },
  { month: "Oct", ventas: 9400, objetivo: 8000 },
  { month: "Nov", ventas: 8800, objetivo: 8500 },
  { month: "Dic", ventas: 10400, objetivo: 9000 },
];

export const categoryDistribution = [
  { name: "Electrónica", value: 38 },
  { name: "Ropa", value: 24 },
  { name: "Hogar", value: 18 },
  { name: "Deportes", value: 12 },
  { name: "Otros", value: 8 },
];

export type TransactionStatus = "completado" | "pendiente" | "fallido";

export interface Transaction {
  id: string;
  cliente: string;
  producto: string;
  fecha: string;
  monto: number;
  estado: TransactionStatus;
}

const nombres = [
  "Ana García", "Carlos Ruiz", "María López", "Juan Pérez", "Lucía Fernández",
  "Diego Torres", "Sofía Martínez", "Andrés Gómez", "Valentina Díaz", "Martín Silva",
  "Camila Rojas", "Federico Castro", "Paula Mendoza", "Julián Ortiz", "Florencia Vega",
  "Nicolás Herrera", "Antonella Paredes", "Sebastián Molina", "Josefina Aguirre", "Rodrigo Luna",
];

const productos = [
  "Auriculares Pro X", "Smartwatch S2", "Teclado mecánico", "Monitor 27\" 4K",
  "Silla ergonómica", "Zapatillas Runner", "Campera impermeable", "Lámpara LED",
  "Cafetera espresso", "Mochila urbana",
];

const estados: TransactionStatus[] = ["completado", "pendiente", "fallido"];

export const transactions: Transaction[] = Array.from({ length: 38 }, (_, i) => ({
  id: `TRX-${(10240 - i).toString()}`,
  cliente: nombres[i % nombres.length],
  producto: productos[(i * 3 + 1) % productos.length],
  fecha: `${String(28 - (i % 28)).padStart(2, "0")}/09/2026`,
  monto: Math.round((49 + ((i * 137) % 950)) * 100) / 100,
  estado: estados[i % 7 === 5 ? 1 : i % 11 === 7 ? 2 : 0],
}));
