
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types/order";

interface Props {
  orders: Order[];
}af

export default function OrderTable({ orders }: Props) {
  const navigate = useNavigate();

  if (!orders.length) {
    return (
      <div className="empty-state">
        <h3>No orders found</h3>
        <p>Try changing your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>GARMENT</th>
            <th>ORDER DATE</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td>
                <strong>{order.customerName}</strong>
                <br />
                <span className="muted-text">{order.phone}</span>
              </td>
              <td>{order.garment}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>₹{order.amount.toLocaleString("en-IN")}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/orders/${order.databaseId || order.id}`)}
                  aria-label={`View ${order.id}`}
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
