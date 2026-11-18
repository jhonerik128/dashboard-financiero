"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { auth, db, firebaseConfigured } from "@/lib/firebase";
import { filterTransactions, type Transaction, type TransactionFilters } from "@/lib/transactions";
import { downloadCsv } from "@/lib/download";
import { FilterBar } from "./filter-bar";
import { SummaryCards } from "./summary-cards";
import { CategoryBreakdown } from "./category-breakdown";
import { TransactionTable } from "./transaction-table";
import { TransactionForm } from "./transaction-form";
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

function parseTransaction(document: QueryDocumentSnapshot<DocumentData>): Transaction | null {
  const data = document.data();
  if (
    typeof data.name !== "string" ||
    typeof data.category !== "string" ||
    typeof data.date !== "string" ||
    typeof data.amount !== "number" ||
    !Number.isFinite(data.amount)
  ) {
    return null;
  }

  return {
    id: document.id,
    name: data.name,
    category: data.category,
    date: data.date,
    amount: data.amount,
    icon: typeof data.icon === "string" ? data.icon : "•",
  };
}

export default function Dashboard() {
  const [filters, setFilters] = useState(initialFilters);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    let unsubscribeTransactions = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      unsubscribeTransactions();
      setUser(currentUser);
      setTransactions([]);
      setConnectionError("");
      setLoadingTransactions(Boolean(currentUser));

      if (currentUser) {
        const userTransactions = collection(db, "users", currentUser.uid, "transactions");
        unsubscribeTransactions = onSnapshot(
          query(userTransactions),
          (snapshot) => {
            setTransactions(
              snapshot.docs
                .map(parseTransaction)
                .filter((transaction): transaction is Transaction => transaction !== null),
            );
            setLoadingTransactions(false);
          },
          () => {
            setConnectionError(
              "No se pudieron cargar los movimientos. Revisa las reglas de Firestore.",
            );
            setLoadingTransactions(false);
          },
        );
      }

      setAuthReady(true);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeTransactions();
    };
  }, []);

  const visible = useMemo(() => filterTransactions(transactions, filters), [transactions, filters]);

  async function handleSignIn() {
    setAuthError("");
    setSigningIn(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch {
      setAuthError("No se pudo iniciar sesión. Inténtalo de nuevo o revisa el proveedor Google en Firebase.");
    } finally {
      setSigningIn(false);
    }
  }

  if (!firebaseConfigured) {
    return (
      <main className="auth-gate">
        <section className="panel auth-card">
          <p className="eyebrow">CONFIGURACIÓN PENDIENTE</p>
          <h1>Conecta Firebase</h1>
          <p>
            Completa las variables de Firebase en el archivo .env.local y reinicia el servidor de
            desarrollo.
          </p>
        </section>
      </main>
    );
  }

  if (!authReady) {
    return <main className="auth-gate" role="status">Cargando sesión…</main>;
  }

  if (!user) {
    return (
      <main className="auth-gate">
        <section className="panel auth-card">
          <p className="eyebrow">FLORECER · FINANZAS</p>
          <h1>Tu panel financiero</h1>
          <p>Inicia sesión para consultar y guardar tus movimientos privados.</p>
          <button className="button primary" type="button" onClick={handleSignIn} disabled={signingIn}>
            {signingIn ? "Conectando…" : "Continuar con Google"}
          </button>
          {authError ? (
            <p className="form-error" role="alert">
              {authError}
            </p>
          ) : null}
        </section>
      </main>
    );
  }

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
          <div className="account-control">
            <span>{user.displayName ?? user.email}</span>
            <button className="button" type="button" onClick={() => void signOut(auth)}>
              Cerrar sesión
            </button>
          </div>
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
        <TransactionForm user={user} />
        {loadingTransactions ? <p className="muted" role="status">Cargando movimientos…</p> : null}
        {connectionError ? <p className="form-error" role="alert">{connectionError}</p> : null}
        <SummaryCards items={visible} />
        <section className="insights" aria-label="Análisis financiero">
          <CashflowChart />
          <CategoryBreakdown items={visible} />
        </section>
        <div className="bottom-grid">
          <TransactionTable
            items={visible}
            onExport={() => downloadCsv(visible)}
            canExport={transactions.length > 0}
          />
          <GoalsPanel />
        </div>
      </main>
    </div>
  );
}
