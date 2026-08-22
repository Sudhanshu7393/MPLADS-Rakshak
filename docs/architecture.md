# System Architecture & Technical Design

## Overview
**MPLADS Rakshak** is designed as a modular, high-resilience intelligence platform. It bridges administrative databases and data science algorithms to support human-in-the-loop oversight.

```
┌──────────────────────────────────────────────────────────┐
│                   React 18 + Tailwind UI                 │
│   • Command Center   • Risk Queue   • Risk Passport      │
│   • Evidence Center  • Map View     • Case Investigations│
└────────────────────────────┬─────────────────────────────┘
                             │ JSON / REST
                             ▼
┌──────────────────────────────────────────────────────────┐
│              Java Spring Boot 3.3 Application            │
│   • Spring Security (JWT Role RBAC)                      │
│   • Ingestion Engine & Column Normalizer                 │
│   • Case Management & Status State Machine               │
│   • Immutable Audit Ledger                               │
│   • Deterministic Fallback Rule Engine                   │
└──────────────┬─────────────────────────────┬─────────────┘
               │ JPA / Hibernate             │ HTTP POST
               ▼                             ▼
┌──────────────────────────────┐ ┌─────────────────────────┐
│ PostgreSQL / Embedded Store  │ │ Python FastAPI Service  │
│ • Works, Agencies, Scores    │ │ • Isolation Forest      │
│ • Cases, Notes, Audit Logs   │ │ • TF-IDF Cosine Sim     │
│ • Dynamic Weight Settings    │ │ • Peer Group Statistics │
└──────────────────────────────┘ └─────────────────────────┘
```

## Layer Descriptions

### 1. Presentation Layer (React + Vite)
- **Framework**: React 18, React Router v6, Tailwind CSS.
- **Charts & Maps**: Recharts (Risk distribution donuts, time series trends, district density) & Leaflet / React-Leaflet (Geospatial markers).
- **Core Screen**: **Risk Passport** — unifies project metadata, statutory evidence status, peer benchmarks, delay metrics, and officer review tools into a single view.

### 2. Business & Security Layer (Java Spring Boot 3.3)
- **Security**: Stateless JWT authentication with role-based access control (`ROLE_ADMIN`, `ROLE_DISTRICT_OFFICER`, `ROLE_REVIEW_OFFICER`).
- **Resilience**: Communicates with the Python ML service via REST; automatically falls back to an internal deterministic statistical engine if the ML service is unreachable.
- **Audit Engine**: Records every officer status transition, comment, and configuration change with user identity and timestamp.

### 3. Machine Learning & Anomaly Engine (Python FastAPI)
- **Peer Group Outlier Detection**: Evaluates project cost relative to its specific category peer group using median, IQR fences, and Z-scores.
- **Multivariate Anomaly Detection**: `IsolationForest` (Scikit-Learn) on normalized cost ratios, execution durations, and progress mismatch indicators.
- **Duplicate Detection**: TF-IDF n-grams + Cosine similarity combined with Haversine spherical distance calculations.
- **Evidence Center**: Evaluates presence of Sanction Document, Work Order, Progress Report, Geo-tagged Photos, and Completion Certificate.
