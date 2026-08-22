# Data Dictionary & Schema Specification

## 1. Work Entity (`works`)
| Field Name | Type | Description | Mandatory |
| :--- | :--- | :--- | :--- |
| `work_id` | `VARCHAR(64)` | Unique statutory identifier for the MPLADS work | Yes |
| `recommendation_id` | `VARCHAR(64)` | MP Recommendation Reference ID | No |
| `mp_id` | `VARCHAR(64)` | Member of Parliament Identifier | No |
| `mp_name` | `VARCHAR(255)` | Hon'ble MP Name & Constituency | No |
| `work_name` | `VARCHAR(500)` | Detailed description and title of the proposal | Yes |
| `category` | `VARCHAR(128)` | Standard scheme sector (Roads, Drinking Water, etc.) | Yes |
| `sub_category` | `VARCHAR(128)` | Specific work subtype | No |
| `state` | `VARCHAR(64)` | State or Union Territory | Yes |
| `district` | `VARCHAR(64)` | Administrative District | Yes |
| `constituency` | `VARCHAR(128)` | Lok Sabha / Rajya Sabha Constituency | No |
| `block` | `VARCHAR(128)` | Development Block / Tehsil | No |
| `village` | `VARCHAR(128)` | Village / Gram Panchayat / Ward | No |
| `latitude` | `DOUBLE` | Latitude coordinate in decimal degrees | No |
| `longitude` | `DOUBLE` | Longitude coordinate in decimal degrees | No |
| `recommended_amount` | `DOUBLE` | Cost recommended by the MP (in ₹) | No |
| `sanctioned_amount` | `DOUBLE` | Statutorily approved cost by District Authority (in ₹) | Yes |
| `expenditure_amount` | `DOUBLE` | Total funds disbursed to implementing agency (in ₹) | No |
| `remaining_amount` | `DOUBLE` | Unspent sanctioned balance (in ₹) | No |
| `sanction_date` | `DATE` | Date of administrative sanction | No |
| `start_date` | `DATE` | Work commencement date | No |
| `expected_completion_date` | `DATE` | Scheduled completion milestone | No |
| `actual_completion_date` | `DATE` | Actual completion date | No |
| `status` | `VARCHAR(32)` | Ongoing, Completed, Sanctioned, Delayed | Yes |
| `progress_percentage` | `DOUBLE` | Reported physical milestone progress (0 - 100%) | No |
| `implementing_agency_name` | `VARCHAR(255)` | Department / Contractor executing work | No |
| `document_count` | `INTEGER` | Uploaded statutory documents count | No |
| `photo_count` | `INTEGER` | Uploaded geo-tagged photographs count | No |
| `has_completion_certificate`| `BOOLEAN` | Whether completion certificate is on file | No |
| `source_type` | `VARCHAR(64)` | PUBLIC DATA, AUTHORIZED DATA, DEMO/SYNTHETIC DATA | Yes |

---

## 2. Risk Score Entity (`risk_scores`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `work_id` | `VARCHAR(64)` | Foreign key to `works` |
| `overall_score` | `INTEGER` | Composite explainable risk score (0 to 100) |
| `risk_level` | `VARCHAR(16)` | `LOW` (0-39), `MEDIUM` (40-69), `HIGH` (70-100) |
| `priority` | `VARCHAR(16)` | `PRIORITY_1`, `PRIORITY_2`, `PRIORITY_3` |
| `confidence` | `VARCHAR(16)` | `HIGH`, `MEDIUM`, `LOW` based on field completeness |
| `cost_score` | `DOUBLE` | Cost anomaly component (0 - 25 pts) |
| `delay_score` | `DOUBLE` | Delay anomaly component (0 - 20 pts) |
| `rule_score` | `DOUBLE` | Deterministic rule violation component (0 - 20 pts) |
| `similarity_score` | `DOUBLE` | Duplicate / overlap component (0 - 15 pts) |
| `agency_score` | `DOUBLE` | Agency concentration component (0 - 10 pts) |
| `evidence_score` | `DOUBLE` | Missing statutory evidence component (0 - 10 pts) |
| `primary_reason` | `VARCHAR(500)` | Plain English primary justification |
| `reasons_json` | `TEXT` | Full list of contributing explanations |
| `evidence_json` | `TEXT` | Structured statistical baselines and evidence |
| `model_version` | `VARCHAR(64)` | Version of algorithm ensemble used |

---

## 3. Investigation Case Entity (`investigation_cases`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `case_number` | `VARCHAR(64)` | Unique reference (e.g. `INV-2026-X892J`) |
| `work_id` | `VARCHAR(64)` | Referenced project ID |
| `status` | `VARCHAR(32)` | `OPEN`, `FIELD_VERIFICATION`, `UNDER_REVIEW`, `ESCALATED`, `RESOLVED`, `DISMISSED` |
| `priority` | `VARCHAR(16)` | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `assigned_officer` | `VARCHAR(255)` | Officer assigned for review |
| `reason_for_review`| `VARCHAR(1000)`| Summary of trigger and officer scope |
| `final_outcome` | `VARCHAR(2000)`| Closing determination |
