
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.risk_engine import (
    get_delivery_risk_summary,
    calculate_order_risk,
)
from app.models.order import Order

router = APIRouter(
    prefix="/api/risk",
    tags=["Delivery Risk"]
)


@router.get("/summary")
def delivery_risk_summary(
    db: Session = Depends(get_db)
):
    return get_delivery_risk_summary(db)


@router.get("/orders/{order_id}")
def order_delivery_risk(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    return calculate_order_risk(order)
