
import { FileSpreadsheet, Clock3 } from "lucide-react";

const history = [
  {
    name: "November_Orders.csv",
    date: "25 Nov 2026",
    records: 48,
    status: "Completed",
  },
  {
    name: "October_Orders.csv",
    date: "31 Oct 2026",
    records: 36,
    status: "Completed",
  },
];

export default function UploadHistory() {
  return (
    <section className="orders-card upload-history">
      <div className="section-heading">
        <div>
          <h2>Recent Uploads</h2>
          <p>Previous CSV import activity.</p>
        </div>
      </div>

      {history.map((item) => (
        <div className="history-item" key={item.name}>
          <div className="history-icon">
            <FileSpreadsheet size={20} />
          </div>

          <div className="history-info">
            <strong>{item.name}</strong>
            <span>
              <Clock3 size={12} />
              {item.date} · {item.records} records
            </span>
          </div>

          <span className="history-success">
            {item.status}
          </span>
        </div>
      ))}
    </section>
  );
}
