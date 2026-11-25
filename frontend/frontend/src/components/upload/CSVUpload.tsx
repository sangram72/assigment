
import { useRef, useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  X,
} from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  fileName?: string;
}

export default function CSVUpload({
  onFileSelect,
  onRemove,
  fileName,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file?: File) => {
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`upload-zone ${dragging ? "dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {fileName ? (
        <>
          <FileSpreadsheet size={35} color="#4f46e5" />

          <h3>{fileName}</h3>
          <p>File selected successfully</p>

          <button
            type="button"
            className="upload-remove"
            onClick={onRemove}
          >
            <X size={15} />
            Replace file
          </button>
        </>
      ) : (
        <>
          <div className="upload-icon">
            <UploadCloud size={32} />
          </div>

          <h3>Upload your CSV file</h3>

          <p>
            Drag and drop your file here, or browse from your computer.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() => inputRef.current?.click()}
          >
            Browse CSV File
          </button>

          <span className="upload-hint">
            CSV format only · Maximum 10 MB
          </span>
        </>
      )}
    </div>
  );
}
