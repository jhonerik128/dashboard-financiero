export function GoalsPanel() {
  return (
    <section className="panel goals" id="metas" aria-labelledby="goals-title">
      <div className="panel-heading">
        <div>
          <h2 id="goals-title">Metas de ahorro</h2>
          <p className="muted">Pequeños pasos, grandes planes</p>
        </div>
      </div>
      <Goal name="Viaje a Japón" amount="$4.200.000" target="$7.000.000" progress={60} />
      <Goal name="Fondo de emergencia" amount="$8.400.000" target="$10.000.000" progress={84} />
      <Goal name="Nuevo portátil" amount="$1.600.000" target="$4.000.000" progress={40} />
    </section>
  );
}
function Goal({
  name,
  amount,
  target,
  progress,
}: {
  name: string;
  amount: string;
  target: string;
  progress: number;
}) {
  return (
    <div className="goal-item">
      <div className="goal-label">
        <strong>{name}</strong>
        <span>
          {amount} / {target}
        </span>
      </div>
      <progress max={100} value={progress} aria-label={`${name}: ${progress}%`}>
        {progress}%
      </progress>
    </div>
  );
}
