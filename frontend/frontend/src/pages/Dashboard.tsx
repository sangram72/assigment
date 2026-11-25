import StatsCards from "../components/dashboard/StatsCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import { useOrders } from "../hooks/useOrders";

export default function Dashboard() {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return <div className="page-content">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="page-content">{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your tailoring business.</p>
        </div>
      </div>

      <StatsCards orders={orders} />

      <RecentOrders orders={orders} />
    </div>
  );
}