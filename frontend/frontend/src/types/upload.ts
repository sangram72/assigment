
export interface CSVRow {
  [key: string]: string;
}

export type UploadStatus =
  | "idle"
  | "parsing"
  | "preview"
  | "uploading"
  | "success"
  | "error";

export interface CSVValidation {
  total_rows: number;
  valid_rows: number;
  empty_rows: number;
  duplicate_rows: number;
  warnings: string[];
}

export interface CSVPreview {
  filename: string;
  headers: string[];
  rows: CSVRow[];
  validation: CSVValidation;
}
