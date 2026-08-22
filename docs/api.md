# REST API Documentation

## Base URL: `/api`

### 1. Authentication
- `POST /api/auth/login`
  - **Body**: `{ "email": "officer@mplads.gov.in", "password": "..." }`
  - **Response**: `{ "token": "...", "email": "...", "fullName": "...", "role": "..." }`

---

### 2. Dashboard
- `GET /api/dashboard/summary`
  - Returns top-level KPIs, risk distribution, top districts, risk progression trend, and active data mode.

---

### 3. Works & Risk Queue
- `GET /api/risks/queue`
  - **Query Params**: `riskLevel`, `district`, `category`, `status`, `search`, `sortBy`, `sortDir`, `page`, `size`
  - Returns paginated ranked queue of flagged works.

- `GET /api/risks/passport/{workId}`
  - Returns full 360-degree Risk Passport including subscores, reasons, Evidence Center checklist, peer cost benchmark, timeline analysis, and similar works.

- `POST /api/risks/run-analysis`
  - Re-executes the multi-tier anomaly engine across all records in the database.

- `POST /api/risks/evidence-action/{workId}`
  - **Body**: `{ "evidenceId": "completion_cert", "actionType": "REQUEST_EVIDENCE", "officerNote": "..." }`
  - Logs evidence requisition and triggers case creation.

---

### 4. Similar Works Explorer
- `GET /api/similar/{workId}`
  - Returns detected overlapping proposals for a specific work.
- `GET /api/similar`
  - Returns all detected high-similarity pairs across the dataset.

---

### 5. Investigations & Case Management
- `GET /api/investigations`
  - Returns paginated investigation cases.
- `POST /api/investigations`
  - Creates a new investigation case.
- `PATCH /api/investigations/{caseNumber}`
  - Updates case status (`OPEN`, `FIELD_VERIFICATION`, `UNDER_REVIEW`, `ESCALATED`, `RESOLVED`, `DISMISSED`) and appends officer note.
- `POST /api/investigations/{caseNumber}/notes`
  - Records an immutable investigation note.

---

### 6. Data Ingestion & Quality
- `POST /api/data/upload` (Multipart file)
  - Returns preview of rows, detected headers, and suggested column mappings.
- `POST /api/data/ingest`
  - Ingests dataset with confirmed column mappings.
- `POST /api/data/load-demo`
  - 1-Click ingestion of the deterministic 1,600-work SIH benchmark dataset.
- `GET /api/data/status`
  - Returns data completeness and validity scorecard.

---

### 7. Governance & Calibration
- `GET /api/audit`
  - Returns paginated immutable audit log trail.
- `GET /api/settings/weights`
  - Returns active risk scoring weights.
- `POST /api/settings/weights`
  - Updates scoring weights and triggers automatic universe recalibration.
- `GET /api/reports/dossier/{workId}`
  - Generates official printable assessment dossier.
