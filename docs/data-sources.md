# Data Sources & Ingestion Strategy

To ensure compliance with SIH guidelines and government data governance standards, MPLADS Rakshak strictly distinguishes between 3 data tiers:

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA STRATEGY TIERS                     │
├──────────────────────────────┬──────────────────────────────┤
│ 1. PUBLIC DATA MODE          │ Open Government Data (OGD)   │
│                              │ data.gov.in / public MoSPI   │
├──────────────────────────────┼──────────────────────────────┤
│ 2. AUTHORIZED DATA MODE      │ Direct eSAKSHI API Bridge    │
│                              │ (For future MoSPI deployment)│
├──────────────────────────────┼──────────────────────────────┤
│ 3. DEMO / SYNTHETIC MODE     │ Seeded SIH Benchmark Dataset │
│                              │ (/data/demo/mplads_demo.csv) │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 1. Verified Official / Public Sources
- **Official MPLADS Public Portal**: [mplads.mospi.gov.in](https://mplads.mospi.gov.in/digigov/dashboard.html)
- **Open Government Data Platform (OGD)**: [data.gov.in](https://data.gov.in/)
  - Datasets: State-wise MPLADS allocations, physical completion metrics, expenditure summaries.
- **MoSPI Annual Report 2023–24**: [MoSPI Report](https://mospi.gov.in/sites/default/files/publication_reports/AnnualReport_2023-24.pdf)
- **MoSPI 28th COCSSO Presentation**: [eSAKSHI Workflow](https://mospi.gov.in/sites/default/files/cocsso/Plenary%201_28th_COCSSO.pdf)

> **Important Rule**: We do not scrape authenticated pages or bypass government logins. Public data is ingested cleanly via standard CSV export or open APIs.

---

## 2. Authorized Integration Architecture (Future Scope)
When authorized credentials and API endpoints are provided by MoSPI / Central Nodal Agency:
1. Connect via Spring Boot REST client with mutual TLS / authorized bearer tokens.
2. Ingest structured records directly into the database without requiring code alterations in the ML anomaly or frontend layers.

---

## 3. Synthetic Benchmark Dataset (SIH Demo Mode)
- **Location**: `data/demo/mplads_demo_dataset.csv`
- **Specification**: 1,600 realistic records seeded deterministically (`random.seed(20260823)`).
- **Labeling**: Every record contains `source_type="DEMO/SYNTHETIC DATA"` and displays the `[DEMO / SYNTHETIC DATA]` badge in the UI.
- **Injected Scenarios**:
  1. `MPL-2024-UP-004821`: Severe Cost Anomaly (₹48 Lakh vs ₹31.2 Lakh peer median).
  2. `MPL-2024-UP-004822`: High Similarity Duplicate Proposal (92% text match + 420m distance).
  3. `MPL-2024-MH-001890`: 100% Completed Work Missing Statutory Completion Certificate.
  4. `MPL-2024-BR-003310`: Chronic Execution Delay (380+ days overdue with low progress).
