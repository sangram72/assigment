
import {
  LayoutDashboard,
  ShoppingBag,
  Scissors,
  Upload,
  Settings,
  Shirt,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Orders", path: "/orders", icon: ShoppingBag },
  { label: "Production", path: "/production", icon: Scissors },
  { label: "Import CSV", path: "/import", icon: Upload },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Shirt size={23} />
        </div>
        <div>
          <h2>StitchFlow</h2>
          <span>Tailor Management</span>
        </div>
      </div>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <p>Need help?</p>
          <span>Manage your tailoring workflow efficiently.</span>
        </div>
        <div className="sidebar-version">
          <ChevronLeft size={15} />
          <span>StitchFlow v1.0</span>
        </div>
      </div>
    </aside>
  );
}
