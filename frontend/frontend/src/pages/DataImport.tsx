
import { useCSVUpload } from "../hooks/useCSVUpload";

import CSVUpload from "../components/upload/CSVUpload";
import UploadPreview from "../components/upload/UploadPreview";
import UploadStatusView from "../components/upload/UploadStatus";
import UploadHistory from "../components/upload/UploadHistory";

export default function DataImport() {
  const {
    status,
    preview,
    error,
    processFile,
    resetUpload,
  } = useCSVUpload();

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h1>Import Data</h1>
          <p>
            Upload your tailoring business orders using a CSV file.
          </p>
        </div>
      </div>

      <section className="orders-card import-section">
        <div className="section-heading">
          <div>
            <h2>Upload Orders CSV</h2>
            <p>Select a CSV file from your computer.</p>
          </div>
        </div>

        <CSVUpload
          onFileSelect={processFile}
          onRemove={resetUpload}
          fileName={preview?.filename}
        />

        <UploadStatusView
          status={status}
          error={error}
        />

        {preview && (
          <>
            <UploadPreview preview={preview} />

            <div className="import-actions">
              <button
                className="secondary-btn"
                onClick={resetUpload}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                disabled
                title="Import confirmation will be implemented in the next phase"
              >
                Confirm Import
              </button>
            </div>

            <p className="import-note">
              Backend validation completed. Permanent import
              will be available after database integration.
            </p>
          </>
        )}
      </section>

      <UploadHistory />
    </div>
  );
}
