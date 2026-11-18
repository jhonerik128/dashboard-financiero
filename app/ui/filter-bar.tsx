import type { TransactionFilters } from "@/lib/transactions";
type Props = { filters: TransactionFilters; onChange: (filters: TransactionFilters) => void };
const categories = [
  "Alimentación",
  "Vivienda",
  "Transporte",
  "Salud",
  "Entretenimiento",
  "Salario",
  "Freelance",
  "Otros",
];
export function FilterBar({ filters, onChange }: Props) {
  const update = (key: keyof TransactionFilters, value: string) =>
    onChange({ ...filters, [key]: value });
  return (
    <section className="filters" aria-label="Filtros de movimientos">
      <FilterSelect
        label="Periodo"
        value={filters.period}
        onChange={(value) => update("period", value)}
        options={[
          ["all", "Todo el periodo"],
          ["month", "Este mes"],
          ["quarter", "Últimos 3 meses"],
        ]}
      />
      <FilterSelect
        label="Categoría"
        value={filters.category}
        onChange={(value) => update("category", value)}
        options={[["all", "Todas"], ...categories.map((category) => [category, category])]}
      />
      <FilterDate label="Desde" value={filters.from} onChange={(value) => update("from", value)} />
      <FilterDate label="Hasta" value={filters.to} onChange={(value) => update("to", value)} />
      <label className="search-label">
        Buscar
        <input
          type="search"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Movimiento o categoría"
        />
      </label>
    </section>
  );
}
type SelectProps = {
  label: string;
  value: string;
  options: string[][];
  onChange: (value: string) => void;
};
function FilterSelect({ label, value, options, onChange }: SelectProps) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([option, text]) => (
          <option value={option} key={option}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function FilterDate({ label, value, onChange }: Omit<SelectProps, "options">) {
  return (
    <label>
      {label}
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
