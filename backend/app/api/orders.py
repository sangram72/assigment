
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.order import Order
from app.models.production_history import ProductionHistory
from app.schemas.order_status import OrderStatusUpdate
from app.services.production_service import update_production_status

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.created_at.desc()).all()

    return {
        "total": len(orders),
        "orders": [
            {
                "id": order.id,
                "external_id": order.external_id,
                "source_file": order.source_file,
                "raw_data": order.raw_data,
                "status": order.status,
                "created_at": order.created_at,
                "updated_at": order.updated_at,
            }
            for order in orders
        ],
    }


@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    return {
        "id": order.id,
        "external_id": order.external_id,
        "source_file": order.source_file,
        "raw_data": order.raw_data,
        "status": order.status,
        "created_at": order.created_at,
        "updated_at": order.updated_at,
    }


@router.patch("/{order_id}/status")
def change_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    db: Session = Depends(get_db),
):
    return update_production_status(
        order_id=order_id,
        new_status=payload.status,
        db=db,
    )


@router.get("/{order_id}/history")
def get_production_history(
    order_id: int,
    db: Session = Depends(get_db),
):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    history = (
        db.query(ProductionHistory)
        .filter(ProductionHistory.order_id == order_id)
        .order_by(ProductionHistory.changed_at.desc())
        .all()
    )

    return {
        "order_id": order_id,
        "total_changes": len(history),
        "history": [
            {
                "previous_status": item.previous_status,
                "new_status": item.new_status,
                "changed_by": item.changed_by,
                "notes": item.notes,
                "changed_at": item.changed_at,
            }
            for item in history
        ],
    }
