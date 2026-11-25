from fastapi import APIRouter, File, UploadFile, Depends
from sqlalchemy.orm import Session

from app.services.csv_processor import process_csv
from app.services.import_service import import_csv
from app.schemas.upload import CSVPreviewResponse
from app.core.database import get_db

router = APIRouter(
    prefix="/api/upload",
    tags=["CSV Upload"]
)


@router.post("/preview", response_model=CSVPreviewResponse)
async def preview_csv(file: UploadFile = File(...)):
    return await process_csv(file)


@router.post("/confirm")
async def confirm_csv_import(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    return await import_csv(file, db)