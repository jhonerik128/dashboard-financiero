import { toCsv, type Transaction } from "./transactions";
export function downloadCsv(items: Transaction[]): void {
  const blob = new Blob(["\ufeff", toCsv(items)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "florecer-movimientos.csv";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
