
import type { CSVRow } from "../types/upload";

const ORDER_ID_HEADERS = [
  "order_id",
  "orderid",
  "order id",
  "order_number",
  "order number",
];

export function findOrderIdColumn(headers: string[]) {
  return headers.find((header) =>
    ORDER_ID_HEADERS.includes(header.trim().toLowerCase())
  );
}

export function validateCSV(
  headers: string[],
  rows: CSVRow[]
) {
  const emptyRows = rows.filter((row) =>
    headers.every((header) => !row[header]?.trim())
  );

  const nonEmptyRows = rows.filter((row) =>
    headers.some((header) => row[header]?.trim())
  );

  const idColumn = findOrderIdColumn(headers);

  let duplicateRows = 0;

  if (idColumn) {
    const seen = new Set<string>();

    nonEmptyRows.forEach((row) => {
      const id = row[idColumn]?.trim();

      if (id && seen.has(id)) {
        duplicateRows++;
      } else if (id) {
        seen.add(id);
      }
    });
  }

  const warnings: string[] = [];

  if (!idColumn) {
    warnings.push(
      "No recognizable order ID column found. Duplicate detection is unavailable."
    );
  }

  if (!headers.length) {
    warnings.push("The CSV does not contain column headers.");
  }

  if (duplicateRows > 0) {
    warnings.push(`${duplicateRows} duplicate order IDs detected.`);
  }

  return {
    totalRows: rows.length,
    validRows: nonEmptyRows.length - duplicateRows,
    emptyRows: emptyRows.length,
    duplicateRows,
    missingHeaders: [],
    warnings,
  };
}
