from datetime import datetime
from typing import Dict, List, Any
import pandas as pd

def parse_date(date_str):
    if not date_str or pd.isna(date_str) or str(date_str).strip() == '':
        return None
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d"):
        try:
            return datetime.strptime(str(date_str).strip()[:10], fmt)
        except ValueError:
            pass
    return None

def analyze_delays(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Evaluates milestone delay, elapsed duration, sanction-to-start lag,
    and completion status timeline.
    """
    now = datetime(2026, 8, 23)
    results = []
    
    for r in records:
        work_id = str(r.get("work_id", ""))
        status = str(r.get("status", "Ongoing")).upper()
        
        sanction_d = parse_date(r.get("sanction_date"))
        start_d = parse_date(r.get("start_date"))
        expected_d = parse_date(r.get("expected_completion_date"))
        actual_d = parse_date(r.get("actual_completion_date"))
        
        # Norm: expected duration is typically 180 - 365 days if not specified
        expected_duration_days = 365
        if sanction_d and expected_d:
            expected_duration_days = max(30, (expected_d - sanction_d).days)
            
        elapsed_days = 0
        delay_days = 0
        is_delayed = False
        
        if status in ["COMPLETED", "FINISHED"]:
            if sanction_d and actual_d:
                elapsed_days = max(0, (actual_d - sanction_d).days)
                if expected_d and actual_d > expected_d:
                    delay_days = (actual_d - expected_d).days
                    is_delayed = delay_days > 30
        else: # Ongoing / In Progress / Sanctioned
            if sanction_d:
                elapsed_days = max(0, (now - sanction_d).days)
                if expected_d and now > expected_d:
                    delay_days = (now - expected_d).days
                    is_delayed = delay_days > 30
                elif not expected_d and elapsed_days > 365:
                    delay_days = elapsed_days - 365
                    is_delayed = True
                    
        # Calculate Delay Score (0 to 20 pts)
        if delay_days <= 0:
            delay_score = 0.0
            severity = "ON_TRACK"
            explanation = "Work execution is on schedule."
        elif delay_days <= 60:
            delay_score = 6.0
            severity = "MINOR_DELAY"
            explanation = f"Execution delayed by {delay_days} days past milestone target."
        elif delay_days <= 180:
            delay_score = 13.0
            severity = "MODERATE_DELAY"
            explanation = f"Execution delayed by {delay_days} days ({round(delay_days/30, 1)} months) beyond scheduled completion."
        else:
            delay_score = 20.0
            severity = "CRITICAL_DELAY"
            explanation = f"Severe project delay of {delay_days} days ({round(delay_days/30, 1)} months) with incomplete physical milestones."
            
        results.append({
            "work_id": work_id,
            "expected_duration_days": expected_duration_days,
            "elapsed_duration_days": elapsed_days,
            "delay_days": max(0, delay_days),
            "is_delayed": is_delayed,
            "delay_risk_score": round(delay_score, 1),
            "severity": severity,
            "explanation": explanation
        })
        
    return results
