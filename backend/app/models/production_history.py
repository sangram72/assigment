
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class ProductionHistory(Base):
    __tablename__ = "production_history"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False,
        index=True
    )

    previous_status = Column(String, nullable=True)

    new_status = Column(String, nullable=False)

    changed_by = Column(String, nullable=True)

    notes = Column(String, nullable=True)

    changed_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
