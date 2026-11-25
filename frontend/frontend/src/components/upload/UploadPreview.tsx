
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { CSVPreview } from "../../types/upload";

interface Props {
  preview: CSVPreview;
}

export default function UploadPreview({ preview }: Props) {
  const { headers, rows, validation } = preview;

  return (
    <section className="preview-card">
      <div className="preview-heading">
        <div>
          <h3>CSV Data Preview</h3>
          <p>{preview.filename}</p>
        </div>

        <span className="preview-count">
          {validation.total_rows} rows
        </span>
      </div>

      <div className="validation-grid">
        <div>
          <CheckCircle2 color="#059669" size={19} />
          <span>Valid rows</span>
          <strong>{validation.valid_rows}</strong>
        </div>

        <div>
          <AlertTriangle color="#d97706" size={19} />
          <span>Empty rows</span>
          <strong>{validation.empty_rows}</strong>
        </div>

        <div>
          <AlertTriangle color="#dc2626" size={19} />
          <span>Duplicate IDs</span>
          <strong>{validation.duplicate_rows}</strong>
        </div>
      </div>

      {validation.warnings.length > 0 && (
        <div className="validation-warnings">
          {validation.warnings.map((warning, index) => (
            <p key={index}>
              <AlertTriangle size={15} />
              {warning}
            </p>
          ))}
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>
                    {row[header] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
