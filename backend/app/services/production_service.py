
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.production_history import ProductionHistory


PRODUCTION_STATUSES = [
    "Pending",
    "Cutting",
    "Stitching",
    "Finishing",
    "Ready",
    "Delivered",
]


def update_production_status(
    order_id: int,
    new_status: str,
    db: Session,
    changed_by: str | None = None,
    notes: str | None = None,
):
    # Validate requested status
    if new_status not in PRODUCTION_STATUSES:
        raise HTTPException(
            status_code=400,
            detail="Invalid production status."
        )

    # Find order
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    previous_status = order.status

    # Prevent unnecessary updates
    if previous_status == new_status:
        raise HTTPException(
            status_code=400,
            detail="Order already has this status."
        )

    # Validate workflow sequence
    current_index = PRODUCTION_STATUSES.index(previous_status)
    new_index = PRODUCTION_STATUSES.index(new_status)

    if new_index != current_index + 1:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Invalid transition from {previous_status} "
                f"to {new_status}."
            )
        )

    # Update order and record history in one transaction
    try:
        order.status = new_status

        history = ProductionHistory(
            order_id=order.id,
            previous_status=previous_status,
            new_status=new_status,
            changed_by=changed_by,
            notes=notes,
        )

        db.add(history)
        db.commit()
        db.refresh(order)

        return {
            "message": "Production status updated successfully.",
            "order_id": order.id,
            "previous_status": previous_status,
            "new_status": order.status,
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to update production status."
        )
