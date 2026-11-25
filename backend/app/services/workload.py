
from datetime import date, datetime

from sqlalchemy.orm import Session

from app.models.order import Order


ACTIVE_STATUSES = [
    "Pending",
    "Cutting",
    "Stitching",
    "Finishing",
    "Ready",
]


def get_workload_summary(db: Session):
    orders = db.query(Order).all()

    stage_counts = {
        status: 0
        for status in ACTIVE_STATUSES
    }

    overdue_orders = []
    upcoming_orders = []

    today = date.today()

    for order in orders:
        status = order.status

        if status in stage_counts:
            stage_counts[status] += 1

        raw_data = order.raw_data or {}

        delivery_value = (
            raw_data.get("delivery_date")
            or raw_data.get("Delivery Date")
            or raw_data.get("delivery date")
        )

        if not delivery_value:
            continue

        try:
            delivery_date = datetime.strptime(
                delivery_value.strip(),
                "%Y-%m-%d"
            ).date()
        except (ValueError, AttributeError):
            continue

        order_info = {
            "order_id": order.id,
            "external_id": order.external_id,
            "status": status,
            "delivery_date": delivery_date.isoformat(),
        }

        if delivery_date < today and status != "Delivered":
            overdue_orders.append(order_info)

        elif 0 <= (delivery_date - today).days <= 7 and status != "Delivered":
            upcoming_orders.append(order_info)

    active_orders = sum(stage_counts.values())

    return {
        "total_orders": len(orders),
        "active_orders": active_orders,
        "delivered_orders": sum(
            1 for order in orders
            if order.status == "Delivered"
        ),
        "stage_distribution": stage_counts,
        "overdue_count": len(overdue_orders),
        "upcoming_delivery_count": len(upcoming_orders),
        "overdue_orders": overdue_orders,
        "upcoming_orders": upcoming_orders,
    }
