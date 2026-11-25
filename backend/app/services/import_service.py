
import csv
import io

import pandas as pd
from fastapi import HTTPException, UploadFile
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.order import Order


MAX_FILE_SIZE = 10 * 1024 * 1024

ORDER_ID_HEADERS = {
    "order_id",
    "orderid",
    "order id",
    "order_number",
    "order number",
}


async def import_csv(file: UploadFile, db: Session):
    # 1. Validate filename
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported."
        )

    # 2. Read the complete file
    content = await file.read(MAX_FILE_SIZE + 1)

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="CSV file cannot exceed 10 MB."
        )

    if not content:
        raise HTTPException(
            status_code=400,
            detail="Uploaded CSV file is empty."
        )

    # 3. Decode and parse CSV
    try:
        decoded_content = content.decode("utf-8-sig")

        reader = csv.reader(io.StringIO(decoded_content))
        original_headers = next(reader, [])

        headers = [header.strip() for header in original_headers]

        if not headers or any(not header for header in headers):
            raise HTTPException(
                status_code=400,
                detail="CSV contains missing or empty column headers."
            )

        if len(headers) != len(set(headers)):
            raise HTTPException(
                status_code=400,
                detail="CSV contains duplicate column headers."
            )

        df = pd.read_csv(
            io.StringIO(decoded_content),
            dtype=str,
            keep_default_na=False
        )

        df.columns = headers

    except HTTPException:
        raise

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Please upload a UTF-8 encoded CSV file."
        )

    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="CSV does not contain any data."
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to parse CSV file. Please check its format."
        )

    # 4. Find the order ID column
    id_column = next(
        (
            column
            for column in headers
            if column.strip().lower() in ORDER_ID_HEADERS
        ),
        None
    )

    if not id_column:
        raise HTTPException(
            status_code=400,
            detail="CSV must contain a recognizable order ID column."
        )

    total_rows = len(df)

    empty_rows = 0
    invalid_rows = 0
    duplicate_rows = 0

    valid_records = []
    seen_ids = set()

    # 5. Prepare records and detect duplicates within the CSV
    for _, row in df.iterrows():

        raw_data = {
            str(key).strip(): str(value).strip()
            for key, value in row.to_dict().items()
        }

        # Skip completely empty rows
        if all(not value for value in raw_data.values()):
            empty_rows += 1
            continue

        external_id = raw_data.get(id_column, "").strip()

        # Order ID is required
        if not external_id:
            invalid_rows += 1
            continue

        # Detect duplicate IDs in the uploaded file
        if external_id in seen_ids:
            duplicate_rows += 1
            continue

        seen_ids.add(external_id)

        valid_records.append({
            "external_id": external_id,
            "raw_data": raw_data
        })

    # 6. Check whether these orders already exist in SQLite
    candidate_ids = [
        record["external_id"]
        for record in valid_records
    ]

    existing_ids = set()

    if candidate_ids:
        existing_orders = (
            db.query(Order.external_id)
            .filter(Order.external_id.in_(candidate_ids))
            .all()
        )

        existing_ids = {
            order_id
            for (order_id,) in existing_orders
        }

    # 7. Prepare new database records
    orders_to_insert = []

    for record in valid_records:

        external_id = record["external_id"]

        if external_id in existing_ids:
            duplicate_rows += 1
            continue

        orders_to_insert.append(
            Order(
                external_id=external_id,
                source_file=file.filename,
                raw_data=record["raw_data"],
                status="Pending"
            )
        )

    # 8. Save records in one transaction
    try:
        if orders_to_insert:
            db.add_all(orders_to_insert)
            db.commit()

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="An order already exists. Please check for duplicate order IDs."
        )

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to save imported orders."
        )

    imported_rows = len(orders_to_insert)

    skipped_rows = (
        empty_rows
        + invalid_rows
        + duplicate_rows
    )

    # 9. Return import summary
    return {
        "message": "CSV import completed successfully.",
        "filename": file.filename,
        "summary": {
            "total_rows": total_rows,
            "imported_rows": imported_rows,
            "skipped_rows": skipped_rows,
            "empty_rows": empty_rows,
            "invalid_rows": invalid_rows,
            "duplicate_rows": duplicate_rows
        }
    }
