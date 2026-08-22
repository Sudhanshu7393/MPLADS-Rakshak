# Limitations, Risks & Honest Claims Guide

When presenting at Smart India Hackathon 2026, maintaining ethical honesty and scientific rigor establishes strong credibility with senior government evaluators.

---

## 🛑 Claims We Must NEVER Make

1. ❌ **"Our AI model has 98% fraud detection accuracy."**
   - **Why**: There is no publicly available ground-truth labeled fraud dataset for MPLADS. Supervised fraud classification claims are unverifiable.
   - **What we say**: *"Our system is an unsupervised anomaly detector and risk-prioritization engine that flags statistical outliers for human review."*

2. ❌ **"This project is proven to be corrupt / fraudulent."**
   - **Why**: An expensive project may be legitimately complex (e.g. difficult terrain or superior materials). High delay may stem from monsoon flooding or land disputes.
   - **What we say**: *"High-risk pattern detected requiring field verification."*

3. ❌ **"We have direct real-time write access to government eSAKSHI production servers."**
   - **Why**: eSAKSHI is an authorized government network.
   - **What we say**: *"The prototype supports Public OGD Mode, flexible CSV/Excel ingestion, and has an API bridge designed for authorized integration."*

---

## 🛡️ Edge Cases & Built-in Mitigations

| Edge Case | Potential False Positive | Rakshak Mitigation |
| :--- | :--- | :--- |
| **Legitimately expensive hospital or bridge** | Flagged as a cost outlier across all works | Works are **only compared against their same-category peer group** (e.g. Health Sub-Centres vs. Health Sub-Centres). |
| **Two phases of the same road project** | Flagged as a duplicate work | Rephrased as **"Potentially similar work detected"** with side-by-side comparison for officer review. |
| **Missing coordinates** | Crashes the map or skews risk | Coordinates are optional; non-geocoded records function in all other modules with a confidence tag. |
| **ML service offline / cold start** | System stops working | Spring Boot automatically detects ML service disconnection and **falls back to internal deterministic statistical rules**. |
