import { api } from "./api";
import type { Order, OrderStatus } from "../types/order";

interface APIOrder {
  id: number;
  external_id: string | null;
  source_file: string | null;
  raw_data: Record<string, unknown>;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

interface OrdersResponse {
  total: number;
  orders: APIOrder[];
}

const getValue = (
  data: Record<string, unknown>,
  keys: string[]
): string => {
  const normalizedEntries = Object.entries(data).map(([key, value]) => [
    key.toLowerCase().replace(/[\s_-]/g, ""),
    value,
  ]);

  for (const key of keys) {
    const match = normalizedEntries.find(([normalizedKey]) =>
      normalizedKey === key.toLowerCase().replace(/[\s_-]/g, "")
    );

    if (match && match[1] !== null && match[1] !== undefined) {
      return String(match[1]).trim();
    }
  }

  return "";
};

const normalizeStatus = (value: string): OrderStatus => {
  const statuses: OrderStatus[] = [
    "Pending",
    "Cutting",
    "Stitching",
    "Finishing",
    "Ready",
    "Delivered",
  ];

  const match = statuses.find(
    (status) => status.toLowerCase() === value.toLowerCase()
  );

  return match ?? "Pending";
};

const mapAPIOrder = (item: APIOrder): Order => {
  const data = item.raw_data ?? {};

  const amountValue = getValue(data, [
    "amount",
    "price",
    "totalamount",
    "total",
  ]);

  const amount = Number(amountValue.replace(/[₹,\s]/g, ""));

  return {
    id: item.external_id || String(item.id),
    customerName:
      getValue(data, ["customername", "customer", "name"]) || "Unknown",
    phone: getValue(data, ["phone", "mobile", "contact"]),
    garment:
      getValue(data, ["garment", "garmenttype", "item", "product"]) ||
      "Not specified",
    orderDate:
      getValue(data, ["orderdate", "date"]) ||
      item.created_at?.split("T")[0] ||
      "",
    deliveryDate: getValue(data, [
      "deliverydate",
      "duedate",
      "delivery",
    ]),
    status: normalizeStatus(item.status),
    amount: Number.isFinite(amount) ? amount : 0,
    notes: getValue(data, ["notes", "remarks", "description"]),
  };
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<OrdersResponse>("/api/orders/");

  return response.data.orders.map(mapAPIOrder);
};
export const getOrderById = async (
  id: string
): Promise<Order | null> => {
  const response = await api.get<APIOrder>(
    `/api/orders/${encodeURIComponent(id)}`
  );

  return mapAPIOrder(response.data);
};

