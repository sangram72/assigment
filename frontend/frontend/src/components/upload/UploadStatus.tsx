
import { CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import type { UploadStatus } from "../../types/upload";

interface Props {
  status: UploadStatus;
  error: string;
}

export default function UploadStatusView({ status, error }: Props) {
  if (status === "idle") return null;

  if (status === "parsing" || status === "uploading") {
    return (
      <div className="upload-message processing">
        <LoaderCircle size={19} className="spin" />
        <span>
          {status === "parsing"
            ? "Reading and validating CSV..."
            : "Processing import..."}
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="upload-message error">
        <AlertCircle size={19} />
        <span>{error}</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="upload-message success">
        <CheckCircle2 size={19} />
        <span>Import completed successfully.</span>
      </div>
    );
  }

  return null;
}
