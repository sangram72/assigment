
import io
import pandas as pd

from fastapi import HTTPException, UploadFile


MAX_FILE_SIZE = 10 * 1024 * 1024

ORDER_ID_HEADERS = {
    "order_id",
    "orderid",
    "order id",
    "order_number",
    "order number",
}


async def process_csv(file: UploadFile):

    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are supported."
        )

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

    try:
        decoded_content = content.decode("utf-8-sig")

        df = pd.read_csv(
            io.StringIO(decoded_content),
            dtype=str,
            keep_default_na=False,
        )

    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file encoding. Please upload a UTF-8 CSV."
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to parse CSV file. Please check its format."
        )

    headers = [
        str(column).strip()
        for column in df.columns
    ]

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

    df.columns = headers

    total_rows = len(df)

    empty_mask = df.apply(
        lambda row: all(
            not str(value).strip()
            for value in row
        ),
        axis=1,
    )

    empty_rows = int(empty_mask.sum())

    non_empty_df = df.loc[~empty_mask].copy()

    id_column = next(
        (
            column for column in headers
            if column.strip().lower() in ORDER_ID_HEADERS
        ),
        None,
    )

    duplicate_rows = 0

    if id_column:
        ids = non_empty_df[id_column].str.strip()

        duplicate_mask = (
            ids.ne("") & ids.duplicated(keep="first")
        )

        duplicate_rows = int(duplicate_mask.sum())

    warnings = []

    if not id_column:
        warnings.append(
            "No recognizable order ID column found."
        )

    if duplicate_rows:
        warnings.append(
            f"{duplicate_rows} duplicate order IDs detected."
        )

    return {
        "filename": file.filename,
        "headers": headers,
        "rows": non_empty_df.head(10).to_dict(orient="records"),
        "validation": {
            "total_rows": total_rows,
            "valid_rows": len(non_empty_df) - duplicate_rows,
            "empty_rows": empty_rows,
            "duplicate_rows": duplicate_rows,
            "warnings": warnings,
        },
    }
