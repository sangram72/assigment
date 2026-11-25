
export type OrderStatus =
  | "Pending"
  | "Cutting"
  | "Stitching"
  | "Finishing"
  | "Ready"
  | "Delivered";

export interface Order {
  id: string;
  customerName: string;
    databaseId?: string;

  phone: string;
  garment: string;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  amount: number;
  notes?: string;
}
