"use client";
import { useMemo, useState } from "react";
import { filterTransactions, transactions, type TransactionFilters } from "@/lib/transactions";
import { downloadCsv } from "@/lib/download";
import { FilterBar } from "./filter-bar";
import { SummaryCards } from "./summary-cards";
import { CategoryBreakdown } from "./category-breakdown";
import { TransactionTable } from "./transaction-table";
import { CashflowChart } from "./cashflow-chart";
import { Sidebar } from "./sidebar";
import { DashboardHeading } from "./dashboard-heading";
import { GoalsPanel } from "./goals-panel";
const initialFilters: TransactionFilters = {
  period: "all",
  category: "all",
  from: "",
  to: "",
  search: "",
};
export default function Dashboard() {
  const [filters, setFilters] = useState(initialFilters);
  const visible = useMemo(() => filterTransactions(transactions, filters), [filters]);
  return (
    <div className="shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Sidebar />
      <main id="contenido" className="main-content">
        <header className="topbar">
          <p>
            Panel / <strong>Resumen</strong>
          </p>
          <span className="avatar" aria-label="Perfil de Jhon Rivera">
            JR
          </span>
        </header>
        <nav className="mobile-nav" aria-label="Navegación rápida">
          <a href="#contenido">Resumen</a>
          <a href="#movimientos">Movimientos</a>
          <a href="#categorias">Categorías</a>
          <a href="#metas">Metas</a>
        </nav>
        <DashboardHeading
          onReset={() => setFilters(initialFilters)}
          onExport={() => downloadCsv(visible)}
        />
        <FilterBar filters={filters} onChange={setFilters} />
        <SummaryCards items={visible} />
        <section className="insights" aria-label="Análisis financiero">
          <CashflowChart />
          <CategoryBreakdown items={visible} />
        </section>
        <div className="bottom-grid">
          <TransactionTable items={visible} onExport={() => downloadCsv(visible)} />
          <GoalsPanel />
        </div>
      </main>
    </div>
  );
}
