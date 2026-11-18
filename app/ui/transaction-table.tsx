import type { Transaction } from "@/lib/transactions";
import { formatDate, formatMoney } from "@/lib/format";
type Props = { items: Transaction[]; onExport: () => void; canExport?: boolean };
export function TransactionTable({ items, onExport, canExport = true }: Props) {
  return (
    <section className="panel transactions" id="movimientos" aria-labelledby="transactions-title">
      <div className="panel-heading">
        <div>
          <h2 id="transactions-title">Movimientos</h2>
          <p className="muted" aria-live="polite">
            {items.length} movimientos en el resultado
          </p>
        </div>
        {canExport ? (
          <button className="button" type="button" onClick={onExport}>
            ↓ CSV
          </button>
        ) : null}
      </div>
      {items.length ? (
        <TransactionRows items={items} />
      ) : (
        <p className="empty" role="status">
          No hay movimientos para estos filtros.
        </p>
      )}
    </section>
  );
}
function TransactionRows({ items }: { items: Transaction[] }) {
  return (
    <div className="table-scroll">
      <table>
        <caption className="visually-hidden">Movimientos financieros filtrados</caption>
        <thead>
          <tr>
            <th>Movimiento</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td data-label="Categoría">{item.category}</td>
              <td>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </td>
              <td data-label="Importe" className={item.amount > 0 ? "income" : "expense"}>
                {item.amount > 0 ? "+" : "âˆ’"}
                {formatMoney(Math.abs(item.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
