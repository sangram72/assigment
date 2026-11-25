
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.workload import get_workload_summary

router = APIRouter(
    prefix="/api/workload",
    tags=["Workload Management"]
)


@router.get("/summary")
def workload_summary(
    db: Session = Depends(get_db)
):
    return get_workload_summary(db)
