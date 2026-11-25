
import { useState } from "react";

import type {
  CSVPreview,
  UploadStatus,
} from "../types/upload";

import { previewCSV } from "../services/uploadService";

export function useCSVUpload() {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [preview, setPreview] = useState<CSVPreview | null>(null);
  const [error, setError] = useState("");

  const processFile = async (file: File) => {
    setError("");
    setPreview(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file.");
      setStatus("error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      setStatus("error");
      return;
    }

    if (file.size === 0) {
      setError("The selected file is empty.");
      setStatus("error");
      return;
    }

    try {
      setStatus("parsing");

      const result = await previewCSV(file);

      setPreview(result);
      setStatus("preview");
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        "Unable to process CSV. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "CSV validation failed."
      );

      setStatus("error");
    }
  };

  const resetUpload = () => {
    setPreview(null);
    setError("");
    setStatus("idle");
  };

  return {
    status,
    preview,
    error,
    processFile,
    resetUpload,
    setStatus,
  };
}
