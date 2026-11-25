from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func

from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    external_id = Column(String, unique=True, index=True, nullable=True)

    source_file = Column(String, nullable=True)

    raw_data = Column(JSON, nullable=False)

    status = Column(String, default="Pending", nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )