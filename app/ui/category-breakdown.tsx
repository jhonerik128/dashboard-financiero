import type { Transaction } from "@/lib/transactions";
import { formatMoney } from "@/lib/format";
const categoryIcons: Record<string, string> = {
  Alimentación: "⌂",
  Vivienda: "⌂",
  Transporte: "↗",
  Salud: "+",
  Entretenimiento: "☆",
};
export function CategoryBreakdown({ items }: { items: Transaction[] }) {
  const totals = items
    .filter((item) => item.amount < 0)
    .reduce<Record<string, number>>(
      (acc, item) => ({ ...acc, [item.category]: (acc[item.category] ?? 0) - item.amount }),
      {},
    );
  const entries = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const total = entries.reduce((sum, entry) => sum + entry[1], 0);
  return (
    <section className="panel" id="categorias" aria-labelledby="categories-title">
      <div className="panel-heading">
        <div>
          <h2 id="categories-title">Gastos por categoría</h2>
          <p className="muted">Distribución de tus gastos</p>
        </div>
      </div>
      {entries.length ? (
        <ul className="category-list">
          {entries.map(([name, value]) => (
            <li key={name}>
              <span className="category-icon" aria-hidden="true">
                {categoryIcons[name] ?? "◈"}
              </span>
              <span className="category-info">
                <strong>{name}</strong>
                <progress
                  max={total || 1}
                  value={value}
                  aria-label={`${name}: ${Math.round((value / (total || 1)) * 100)}%`}
                />
              </span>
              <span className="category-value">{formatMoney(value)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">Sin gastos en este periodo.</p>
      )}
    </section>
  );
}
