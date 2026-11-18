import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { FilterBar } from "../app/ui/filter-bar";
import { TransactionTable } from "../app/ui/transaction-table";
import type { TransactionFilters } from "../lib/transactions";
const filters: TransactionFilters = {
  period: "all",
  category: "all",
  from: "",
  to: "",
  search: "",
};
describe("accesibilidad del panel", () => {
  it("mantiene etiquetas asociadas y no presenta violaciones axe en filtros y tabla", async () => {
    document.documentElement.lang = "es";
    document.title = "Finanzas";
    const view = render(
      <main>
        <h1>Movimientos financieros</h1>
        <FilterBar filters={filters} onChange={() => undefined} />
        <TransactionTable items={[]} onExport={() => undefined} />
      </main>,
    );
    const result = await axe.run(view.container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(result.violations.map((violation) => violation.id)).toEqual([]);
  });
});
