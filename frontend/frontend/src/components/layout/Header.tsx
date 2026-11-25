
import { Bell, Search, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} />
        <input placeholder="Search orders, customers..." />
        <span>⌘ K</span>
      </div>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="profile">
          <div className="avatar">ST</div>
          <div className="profile-info">
            <strong>Store Admin</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
