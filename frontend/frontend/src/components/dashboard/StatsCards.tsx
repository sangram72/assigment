import type { Order } from "../../types/order";

interface Props {
  orders: Order[];
}

export default function StatsCards({ orders }: Props) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const inProgressOrders = orders.filter((order) =>
    ["Cutting", "Stitching", "Finishing"].includes(order.status)
  ).length;

  const readyOrders = orders.filter(
    (order) => order.status === "Ready"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      description: "All imported orders",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      description: "Waiting to start",
    },
    {
      title: "In Production",
      value: inProgressOrders,
      description: "Currently being processed",
    },
    {
      title: "Ready Orders",
      value: readyOrders,
      description: "Ready for delivery",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.title}>
          <div className="stat-card-content">
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
            <span>{stat.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}