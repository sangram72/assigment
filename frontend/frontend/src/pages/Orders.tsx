
import { Search, ShoppingBag } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import OrderTable from "../components/orders/OrderTable";
import type { OrderStatus } from "../types/order";

const statuses: (OrderStatus | "All")[] = [
  "All",
  "Pending",
  "Cutting",
  "Stitching",
  "Finishing",
  "Ready",
  "Delivered",
];

export default function Orders() {
  const {
    orders,
    filteredOrders,
    loading,
    search,
    setSearch,
    status,
    setStatus,
  } = useOrders();

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all customer orders.</p>
        </div>

        <div className="orders-count">
          <ShoppingBag size={17} />
          {orders.length} Total Orders
        </div>
      </div>

      <section className="orders-card">
        <div className="orders-toolbar">
          <div className="orders-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order, customer or garment..."
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as OrderStatus | "All")
            }
            className="status-filter"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Statuses" : item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : (
          <OrderTable orders={filteredOrders} />
        )}

        <div className="table-footer">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </section>
    </div>
  );
}
