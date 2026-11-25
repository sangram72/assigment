import { api } from "./api";
import type { CSVPreview } from "../types/upload";

export const previewCSV = async (
  file: File
): Promise<CSVPreview> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<CSVPreview>(
    "/api/upload/preview",
    formData
  );

  return response.data;
};