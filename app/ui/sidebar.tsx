export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navegación principal">
      <a className="brand" href="#contenido">
        <span className="brand-mark" aria-hidden="true">
          F
        </span>{" "}
        florecer<span className="brand-dot">.</span>
      </a>
      <nav aria-label="Menú principal">
        <p className="nav-label">MENÚ PRINCIPAL</p>
        <a className="nav-link active" href="#contenido">
          Resumen
        </a>
        <a className="nav-link" href="#movimientos">
          Transacciones
        </a>
        <a className="nav-link" href="#categorias">
          Gastos por categoría
        </a>
        <a className="nav-link" href="#metas">
          Metas de ahorro
        </a>
      </nav>
      <div className="profile">
        <span className="avatar" aria-hidden="true">
          JR
        </span>
        <span>
          <strong>Jhon Rivera</strong>
          <small>Cuenta personal</small>
        </span>
      </div>
    </aside>
  );
}
