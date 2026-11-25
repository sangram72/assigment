
from datetime import date, datetime

from sqlalchemy.orm import Session

from app.models.order import Order


DELIVERED_STATUS = "Delivered"

ACTIVE_STATUSES = {
    "Pending",
    "Cutting",
    "Stitching",
    "Finishing",
    "Ready",
}


def parse_delivery_date(raw_data: dict) -> date | None:
    """Find and parse the delivery date from imported CSV data."""

    normalized_data = {
        "".join(char.lower() for char in str(key) if char.isalnum()): value
        for key, value in (raw_data or {}).items()
    }

    date_value = (
        normalized_data.get("deliverydate")
        or normalized_data.get("duedate")
    )

    if not date_value:
        return None

    date_value = str(date_value).strip()

    formats = [
        "%Y-%m-%d",
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%Y/%m/%d",
        "%Y-%m-%d %H:%M:%S",
    ]

    for date_format in formats:
        try:
            return datetime.strptime(
                date_value,
                date_format
            ).date()
        except ValueError:
            continue

    return None


def calculate_order_risk(order: Order) -> dict:
    """Calculate delivery risk for an individual order."""

    today = date.today()
    status = order.status

    delivery_date = parse_delivery_date(order.raw_data)

    result = {
        "order_id": order.id,
        "external_id": order.external_id,
        "status": status,
        "delivery_date": (
            delivery_date.isoformat()
            if delivery_date else None
        ),
        "days_remaining": None,
        "risk_level": "Unknown",
        "risk_reason": "Delivery date is missing or invalid.",
    }

    if not delivery_date:
        return result

    days_remaining = (delivery_date - today).days

    result["days_remaining"] = days_remaining

    if status == DELIVERED_STATUS:
        result.update({
            "risk_level": "Low",
            "risk_reason": "Order has already been delivered.",
        })
        return result

    if days_remaining < 0:
        result.update({
            "risk_level": "High",
            "risk_reason": "Delivery deadline has passed.",
        })
        return result

    if status not in ACTIVE_STATUSES:
        result.update({
            "risk_level": "Unknown",
            "risk_reason": "Unrecognized production status.",
        })
        return result

    if status in {"Pending", "Cutting"}:
        if days_remaining <= 5:
            risk = "High"
            reason = "Order has not progressed sufficiently and delivery is approaching."
        elif days_remaining <= 10:
            risk = "Medium"
            reason = "Order is still in an early production stage."
        else:
            risk = "Low"
            reason = "Sufficient delivery time remains."

    elif status == "Stitching":
        if days_remaining <= 2:
            risk = "High"
            reason = "Stitching is ongoing close to the delivery deadline."
        elif days_remaining <= 5:
            risk = "Medium"
            reason = "Order is still in the stitching stage."
        else:
            risk = "Low"
            reason = "Sufficient delivery time remains."

    elif status == "Finishing":
        if days_remaining <= 1:
            risk = "Medium"
            reason = "Final finishing is pending near the delivery deadline."
        else:
            risk = "Low"
            reason = "Order has reached the finishing stage."

    else:  # Ready
        risk = "Low"
        reason = "Order is ready for customer collection."

    result.update({
        "risk_level": risk,
        "risk_reason": reason,
    })

    return result


def get_delivery_risk_summary(db: Session) -> dict:
    """Calculate delivery risk across all orders."""

    orders = db.query(Order).all()

    risk_results = [
        calculate_order_risk(order)
        for order in orders
    ]

    summary = {
        "High": 0,
        "Medium": 0,
        "Low": 0,
        "Unknown": 0,
    }

    for result in risk_results:
        summary[result["risk_level"]] += 1

    return {
        "total_orders": len(orders),
        "risk_summary": summary,
        "at_risk_orders": [
            result
            for result in risk_results
            if result["risk_level"] in {"High", "Medium"}
        ],
        "orders": risk_results,
    }
