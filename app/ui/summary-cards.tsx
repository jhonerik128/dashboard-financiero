import type { Transaction } from "@/lib/transactions";
import { formatMoney } from "@/lib/format";
export function SummaryCards({ items }: { items: Transaction[] }) {
  const income = items
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);
  const expenses = -items
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);
  const balance = income - expenses;
  const saving = income ? Math.round((balance / income) * 100) : 0;
  const metrics = [
    { label: "Balance neto", value: balance },
    { label: "Ingresos", value: income },
    { label: "Gastos", value: expenses },
  ];
  return (
    <section className="metrics" aria-label="Resumen financiero">
      {metrics.map((metric) => (
        <article className="panel metric" key={metric.label}>
          <h2>{metric.label}</h2>
          <p>{formatMoney(metric.value)}</p>
          <span>Periodo seleccionado</span>
        </article>
      ))}
      <article className="panel metric">
        <h2>Tasa de ahorro</h2>
        <p>{saving}%</p>
        <span>del total de ingresos</span>
      </article>
    </section>
  );
}
