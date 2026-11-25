import { useEffect, useMemo, useState } from "react";
import type { Order, OrderStatus } from "../types/order";
import { getOrders } from "../services/orderService";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();
        setOrders(data);
      } catch {
        setError("Unable to load orders. Please check the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = [
        order.id,
        order.customerName,
        order.garment,
      ].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );

      const matchesStatus =
        status === "All" || order.status === (status as OrderStatus);

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  return {
    orders,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    filteredOrders,
  };
}