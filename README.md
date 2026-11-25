# StitchFlow – Tailor Order & Deadline Manager

## Overview

StitchFlow is a lightweight order management and deadline-risk analysis tool designed to help independent tailoring businesses organize customer orders, monitor production progress, and identify deadlines that require attention.

The project is developed around a real-world problem investigated through personal fieldwork at a local tailoring shop.

## Problem Statement

[Insert the validated problem statement from fieldwork.md.]

## Intended User

- Shop:
- Location:
- User role:

## Features

- Customer order tracking using anonymized order identifiers.
- Garment and quantity management.
- Promised delivery date tracking.
- Production status monitoring.
- Remaining workload calculation.
- Explainable deadline-risk indicators.
- Priority-based order overview.
- CSV-based data processing.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Python
- FastAPI
- Pydantic

### Data Processing
- Python CSV module
- Explainable rule-based risk engine

### Testing
- Pytest

## Architecture

[Insert actual architecture diagram.]

## Project Structure

[Insert final repository structure.]

## Installation

### Backend

```bash
cd backend
python -m venv venv
```

Activate the environment.

Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Dataset

The application reads the actual anonymized observations collected during fieldwork from data.csv.

Number of records: [Actual count]

## Risk Engine

[Explain the implemented calculation, configurable thresholds, and assumptions.]

## Actual Results

[Insert genuine application output using your collected dataset.]

## Known Limitations

- Limited observations from one tailoring business.
- Estimated working hours may differ from actual completion times.
- Customer-requested changes can affect deadlines.
- Risk indicators are decision-support signals, not guaranteed predictions.
- CSV updates must be handled carefully to avoid data inconsistencies.

## Testing

[Insert actual test results.]

## Demo

[Insert your three-minute screen recording link.]

## AI Usage

AI was used for research assistance, software design, coding support, debugging, and documentation.

Actual AI conversation exports are included in the ai-chats directory.

## Conclusion

StitchFlow demonstrates how a small, explainable software solution can address an operational problem identified through real-world observation and user interaction.
