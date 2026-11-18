import Link from "next/link";
export default function NotFound() {
  return (
    <main className="main-content">
      <p className="eyebrow">404</p>
      <h1>No encontramos esa página.</h1>
      <p className="muted">Revisa la dirección o vuelve al resumen financiero.</p>
      <Link className="button primary" href="/">
        Volver al inicio
      </Link>
    </main>
  );
}
