type Props = { onReset: () => void; onExport: () => void };
export function DashboardHeading({ onReset, onExport }: Props) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">TUS FINANZAS, EN ORDEN</p>
        <h1>Tu dinero, en perspectiva.</h1>
        <p className="muted">Un resumen claro para tomar mejores decisiones.</p>
      </div>
      <div className="actions">
        <button className="button" type="button" onClick={onReset}>
          Restablecer filtros
        </button>
        <button className="button primary" type="button" onClick={onExport}>
          Exportar CSV
        </button>
      </div>
    </div>
  );
}
