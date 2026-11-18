export type Transaction = {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
  icon: string;
};

export type TransactionFilters = {
  period: "all" | "month" | "quarter";
  category: string;
  from: string;
  to: string;
  search: string;
};

export const transactions: Transaction[] = [
  {
    id: 1,
    name: "Nómina · Empresa",
    category: "Salario",
    date: "2026-11-15",
    amount: 6800000,
    icon: "↙",
  },
  {
    id: 2,
    name: "Mercado semanal",
    category: "Alimentación",
    date: "2026-11-14",
    amount: -284500,
    icon: "⌂",
  },
  {
    id: 3,
    name: "Arriendo apartamento",
    category: "Vivienda",
    date: "2026-11-12",
    amount: -1650000,
    icon: "⌂",
  },
  {
    id: 4,
    name: "Proyecto identidad visual",
    category: "Freelance",
    date: "2026-11-10",
    amount: 1250000,
    icon: "✳",
  },
  {
    id: 5,
    name: "TransMilenio · recarga",
    category: "Transporte",
    date: "2026-11-09",
    amount: -120000,
    icon: "↗",
  },
  {
    id: 6,
    name: "Cita odontología",
    category: "Salud",
    date: "2026-11-07",
    amount: -185000,
    icon: "＋",
  },
  {
    id: 7,
    name: "Cine y cena",
    category: "Entretenimiento",
    date: "2026-11-05",
    amount: -168000,
    icon: "☆",
  },
  {
    id: 8,
    name: "Nómina · Empresa",
    category: "Salario",
    date: "2026-10-30",
    amount: 6800000,
    icon: "↙",
  },
  {
    id: 9,
    name: "Servicios públicos",
    category: "Vivienda",
    date: "2026-10-26",
    amount: -238000,
    icon: "⌂",
  },
  {
    id: 10,
    name: "Mercado quincenal",
    category: "Alimentación",
    date: "2026-10-21",
    amount: -312000,
    icon: "⌂",
  },
  {
    id: 11,
    name: "Consultoría de marca",
    category: "Freelance",
    date: "2026-10-16",
    amount: 900000,
    icon: "✳",
  },
  { id: 12, name: "Gimnasio", category: "Salud", date: "2026-10-12", amount: -99000, icon: "＋" },
  {
    id: 13,
    name: "Nómina · Empresa",
    category: "Salario",
    date: "2026-09-30",
    amount: 6800000,
    icon: "↙",
  },
  {
    id: 14,
    name: "Seguro del vehículo",
    category: "Transporte",
    date: "2026-09-18",
    amount: -420000,
    icon: "↗",
  },
  {
    id: 15,
    name: "Restaurante",
    category: "Alimentación",
    date: "2026-09-12",
    amount: -142000,
    icon: "⌂",
  },
  {
    id: 16,
    name: "Venta de cámara",
    category: "Otros",
    date: "2026-08-24",
    amount: 530000,
    icon: "◈",
  },
  {
    id: 17,
    name: "Mantenimiento hogar",
    category: "Vivienda",
    date: "2026-07-10",
    amount: -350000,
    icon: "⌂",
  },
];

function matchesPeriod(
  item: Transaction,
  filters: TransactionFilters,
  monthStart: string,
  quarterStart: string,
): boolean {
  if (filters.period === "all") return true;
  if (filters.period === "month") return item.date.startsWith(monthStart);
  return item.date >= quarterStart;
}

function matchesDateRange(item: Transaction, filters: TransactionFilters): boolean {
  const afterStart = !filters.from || item.date >= filters.from;
  const beforeEnd = !filters.to || item.date <= filters.to;
  return afterStart && beforeEnd;
}

function matchesSearch(item: Transaction, query: string): boolean {
  if (!query) return true;
  return `${item.name} ${item.category}`.toLocaleLowerCase("es").includes(query);
}

export function filterTransactions(
  items: Transaction[],
  filters: TransactionFilters,
): Transaction[] {
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const quarterStart = new Date(now.getFullYear(), now.getMonth() - 2, 1)
    .toISOString()
    .slice(0, 10);
  const query = filters.search.trim().toLocaleLowerCase("es");
  return items
    .filter((item) => {
      const periodMatches = matchesPeriod(item, filters, monthStart, quarterStart);
      const categoryMatches = filters.category === "all" || item.category === filters.category;
      return (
        periodMatches &&
        categoryMatches &&
        matchesDateRange(item, filters) &&
        matchesSearch(item, query)
      );
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function toCsv(items: Transaction[]): string {
  const escape = (value: string | number): string => {
    const safe =
      typeof value === "string" && /^[=+@\-\t\r]/.test(value) ? `'${value}` : String(value);
    return `"${safe.replaceAll('"', '""')}"`;
  };
  const header = ["Fecha", "Movimiento", "Categoría", "Tipo", "Importe (COP)"];
  const rows = items.map((item) => [
    item.date,
    item.name,
    item.category,
    item.amount > 0 ? "Ingreso" : "Gasto",
    item.amount,
  ]);
  return [header, ...rows].map((row) => row.map(escape).join(";")).join("\r\n");
}
