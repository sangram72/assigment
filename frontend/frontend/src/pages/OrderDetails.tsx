
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getOrderById } from "../services/orderService";
import type { Order } from "../types/order";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderById(id);
        setOrder(data);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) return <p>Loading order...</p>;

  if (!order) {
    return (
      <div className="empty-state">
        <h2>Order not found</h2>
        <button className="primary-btn" onClick={() => navigate("/orders")}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <button className="back-btn" onClick={() => navigate("/orders")}>
        <ArrowLeft size={17} /> Back to Orders
      </button>

      <div className="page-heading">
        <div>
          <h1>{order.id}</h1>
          <p>Order details and garment information.</p>
        </div>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <section className="orders-card details-grid">
        <div>
          <span>Customer Name</span>
          <strong>{order.customerName}</strong>
        </div>

        <div>
          <span>Phone Number</span>
          <strong>{order.phone}</strong>
        </div>

        <div>
          <span>Garment</span>
          <strong>{order.garment}</strong>
        </div>

        <div>
          <span>Order Date</span>
          <strong>{order.orderDate}</strong>
        </div>

        <div>
          <span>Delivery Date</span>
          <strong>{order.deliveryDate}</strong>
        </div>

        <div>
          <span>Amount</span>
          <strong>₹{order.amount.toLocaleString("en-IN")}</strong>
        </div>

        <div>
          <span>Notes</span>
          <strong>{order.notes || "No additional notes"}</strong>
        </div>
      </section>
    </div>
  );
}
