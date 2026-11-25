from typing import Literal
from pydantic import BaseModel


class OrderStatusUpdate(BaseModel):
    status: Literal[
        "Pending",
        "Cutting",
        "Stitching",
        "Finishing",
        "Ready",
        "Delivered"
    ]