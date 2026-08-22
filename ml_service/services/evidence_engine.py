from typing import Dict, List, Any
from datetime import datetime

def evaluate_project_evidence(record: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates required documents and artifacts according to MPLADS guidelines.
    Matches the Evidence Center and Missing Evidence Deep-Dive specifications.
    """
    status = str(record.get('status', 'Ongoing')).upper()
    progress = float(record.get('progress_percentage', 0.0) or 0.0)
    sanction_d = str(record.get('sanction_date', '2024-01-15'))
    exp_completion_d = str(record.get('expected_completion_date', '2025-12-31'))
    
    # Check flags or synthetic document fields if present
    doc_count = int(record.get('document_count', 3) or 3)
    photo_count = int(record.get('photo_count', 2) or 2)
    has_completion_cert = bool(record.get('has_completion_certificate', status != 'COMPLETED' or doc_count >= 4))
    
    # Deliberate scenario for 100% complete projects missing completion cert
    if status == 'COMPLETED' and doc_count <= 2:
        has_completion_cert = False

    evidence_items = [
        {
            "id": "sanction_doc",
            "name": "Sanction Document",
            "required": True,
            "status": "AVAILABLE" if doc_count >= 1 else "NOT_AVAILABLE",
            "expected_by": sanction_d,
            "why_it_matters": "Official administrative sanction order from District Authority authorizing funds.",
            "risk_impact_pts": 10 if doc_count < 1 else 0,
            "recommended_action": "Verify administrative sanction with District Planning Cell."
        },
        {
            "id": "work_order",
            "name": "Work Order",
            "required": True,
            "status": "AVAILABLE" if doc_count >= 2 else "NOT_AVAILABLE",
            "expected_by": sanction_d,
            "why_it_matters": "Formal contract and scope allocation issued to the Implementing Agency.",
            "risk_impact_pts": 8 if doc_count < 2 else 0,
            "recommended_action": "Request work order copy from Implementing Agency."
        },
        {
            "id": "progress_report",
            "name": "Progress Report",
            "required": True,
            "status": "AVAILABLE" if doc_count >= 3 else ("PENDING_REVIEW" if progress > 50 else "NOT_AVAILABLE"),
            "expected_by": "Quarterly Milestone",
            "why_it_matters": "Periodic physical & financial milestone reporting required under eSAKSHI.",
            "risk_impact_pts": 6 if doc_count < 3 and progress > 30 else 0,
            "recommended_action": "Demand updated physical progress report."
        },
        {
            "id": "site_photo",
            "name": "Site Progress Photo (Geo-tagged)",
            "required": True,
            "status": "AVAILABLE" if photo_count >= 2 else ("PENDING_REVIEW" if photo_count == 1 else "NOT_AVAILABLE"),
            "expected_by": "Prior to Installment Release",
            "why_it_matters": "MoSPI mandate requires geo-tagged photographic evidence before intermediate payments.",
            "risk_impact_pts": 7 if photo_count < 1 else (3 if photo_count == 1 else 0),
            "recommended_action": "Request geo-tagged site inspection photographs from Field Engineer."
        },
        {
            "id": "completion_cert",
            "name": "Completion Certificate",
            "required": status == "COMPLETED" or progress >= 95.0,
            "status": "AVAILABLE" if has_completion_cert else "NOT_AVAILABLE",
            "expected_by": exp_completion_d,
            "why_it_matters": "Project is marked 100% complete, but statutory completion certificate is missing.",
            "risk_impact_pts": 8 if (status == "COMPLETED" or progress >= 95.0) and not has_completion_cert else 0,
            "recommended_action": "Request completion certificate & asset handover document from Implementing Agency."
        }
    ]
    
    missing_items = [e for e in evidence_items if e["status"] == "NOT_AVAILABLE" and e["required"]]
    warning_items = [e for e in evidence_items if e["status"] == "PENDING_REVIEW"]
    
    total_missing_risk_pts = sum(e["risk_impact_pts"] for e in missing_items + warning_items)
    
    return {
        "total_required": len(evidence_items),
        "total_available": len([e for e in evidence_items if e["status"] == "AVAILABLE"]),
        "missing_count": len(missing_items),
        "warning_count": len(warning_items),
        "missing_risk_points": min(20, total_missing_risk_pts),
        "evidence_items": evidence_items
    }
