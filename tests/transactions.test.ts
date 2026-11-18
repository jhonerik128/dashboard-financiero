import { beforeEach, describe, expect, it, vi } from "vitest";
import { filterTransactions, toCsv, type Transaction } from "../lib/transactions";
import { formatDate, formatMoney } from "../lib/format";
const sample: Transaction[] = [
  { id: 1, name: "Nómina", category: "Salario", date: "2026-11-15", amount: 2000, icon: "↙" },
  { id: 2, name: "Mercado", category: "Alimentación", date: "2026-11-14", amount: -300, icon: "⌂" },
];
const base = { period: "all" as const, category: "all", from: "", to: "", search: "" };
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-20T12:00:00Z"));
});
describe("filterTransactions", () => {
  it("combina categoría y búsqueda sin mutar el conjunto original", () => {
    expect(
      filterTransactions(sample, { ...base, category: "Alimentación", search: "merca" }).map(
        (item) => item.id,
      ),
    ).toEqual([2]);
    expect(sample).toHaveLength(2);
  });
  it("filtra por un rango inclusivo de fechas", () => {
    expect(
      filterTransactions(sample, { ...base, from: "2026-11-15", to: "2026-11-15" }),
    ).toHaveLength(1);
  });
  it("filtra por mes y trimestre actuales", () => {
    expect(filterTransactions(sample, { ...base, period: "month" })).toHaveLength(2);
    expect(filterTransactions(sample, { ...base, period: "quarter" })).toHaveLength(2);
  });
  it("devuelve movimientos ordenados del más reciente", () => {
    expect(filterTransactions(sample, base)[0]?.id).toBe(1);
  });
});
describe("toCsv y formatos", () => {
  it("escapa comillas y separa columnas con punto y coma", () => {
    const result = toCsv([{ ...sample[0]!, name: 'Pago "extra"' }]);
    expect(result).toContain('"Pago ""extra"""');
    expect(result).toContain(';"Ingreso";"2000"');
  });
  it("neutraliza texto que podría ejecutar una fórmula en una hoja de cálculo", () => {
    expect(toCsv([{ ...sample[0]!, name: "=HYPERLINK(1)" }])).toContain("'=HYPERLINK(1)");
  });
  it("formatea COP y fechas en español", () => {
    expect(formatMoney(2000)).toContain("2.000");
    expect(formatDate("2026-11-15")).toContain("nov");
  });
});
