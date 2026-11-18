"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";

type Props = { user: User };

export function TransactionForm({ user }: Props) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setSaving(true);

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const amount = Number(formData.get("amount"));
    const type = String(formData.get("type") ?? "expense");

    try {
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        name,
        category,
        date,
        amount: type === "income" ? amount : -amount,
        icon: type === "income" ? "↙" : "↗",
        createdAt: serverTimestamp(),
      });
      form.reset();
    } catch {
      setError("No se pudo guardar. Revisa tu conexión y las reglas de Firestore.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label>
        Movimiento
        <input name="name" maxLength={100} required />
      </label>
      <label>
        Categoría
        <input name="category" maxLength={50} required />
      </label>
      <label>
        Fecha
        <input
          name="date"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
      </label>
      <label>
        Tipo
        <select name="type" defaultValue="expense">
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </label>
      <label>
        Importe (COP)
        <input name="amount" type="number" min="1" step="1" required />
      </label>
      <button className="button primary" type="submit" disabled={saving}>
        {saving ? "Guardando…" : "Guardar movimiento"}
      </button>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
