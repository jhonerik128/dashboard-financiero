export function CashflowChart() {
  return (
    <section className="panel" aria-labelledby="cashflow-title">
      <div className="panel-heading">
        <div>
          <h2 id="cashflow-title">Flujo de efectivo</h2>
          <p className="muted">Resumen ilustrativo de los últimos seis meses</p>
        </div>
      </div>
      <div className="chart-legend">
        <span>
          <i className="legend-income" /> Ingresos
        </span>
        <span>
          <i className="legend-expense" /> Gastos
        </span>
      </div>
      <CashflowSvg />
      <p className="chart-footnote">Cifras demostrativas · pesos colombianos</p>
    </section>
  );
}
function CashflowSvg() {
  return (
    <svg
      className="chart"
      viewBox="0 0 650 220"
      role="img"
      aria-labelledby="chart-title chart-desc"
    >
      <title id="chart-title">Flujo de efectivo de junio a noviembre</title>
      <desc id="chart-desc">
        Gráfico ilustrativo: ingresos por encima de los gastos en los seis meses.
      </desc>
      <g className="chart-grid">
        <path d="M42 35H640M42 82H640M42 129H640M42 176H640" />
      </g>
      <path className="chart-fill" d="M50 90 165 70 280 83 395 48 510 59 625 38V176H50Z" />
      <path className="chart-line income-line" d="M50 90 165 70 280 83 395 48 510 59 625 38" />
      <path
        className="chart-line expense-line"
        d="M50 132 165 121 280 136 395 108 510 117 625 98"
      />
      <g className="chart-labels">
        <text x="45" y="202">
          Jun
        </text>
        <text x="160" y="202">
          Jul
        </text>
        <text x="275" y="202">
          Ago
        </text>
        <text x="390" y="202">
          Sep
        </text>
        <text x="505" y="202">
          Oct
        </text>
        <text x="615" y="202">
          Nov
        </text>
      </g>
    </svg>
  );
}
