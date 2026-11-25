
from pydantic import BaseModel
from typing import Any


class CSVValidation(BaseModel):
    total_rows: int
    valid_rows: int
    empty_rows: int
    duplicate_rows: int
    warnings: list[str]


class CSVPreviewResponse(BaseModel):
    filename: str
    headers: list[str]
    rows: list[dict[str, Any]]
    validation: CSVValidation
