import type { Order } from "../../types/order";

interface Props {
  orders: Order[];
}

export default function RecentOrders({ orders }: Props) {
  const recentOrders = [...orders]
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate))
    .slice(0, 5);

  return (
    <section className="orders-card">
      <div className="section-heading">
        <div>
          <h2>Recent Orders</h2>
          <p>Track your latest customer orders.</p>
        </div>

        <span>Latest activity</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>GARMENT</th>
              <th>DELIVERY DATE</th>
              <th>STATUS</th>
              <th>AMOUNT</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order.databaseId || order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.garment}</td>
                  <td>{order.deliveryDate || "—"}</td>
                  <td>
                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No orders imported yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}