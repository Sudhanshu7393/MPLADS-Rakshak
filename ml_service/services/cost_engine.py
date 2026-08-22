import numpy as np
import pandas as pd
from typing import Dict, List, Any

def analyze_cost_anomalies(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Analyzes project costs against same-category peer groups using Median/IQR & Z-scores.
    Never compares different categories (e.g. road vs hand-pump).
    """
    if not records:
        return []
    
    df = pd.DataFrame(records)
    
    # Required columns fallback
    if 'category' not in df.columns:
        df['category'] = 'General'
    if 'sanctioned_amount' not in df.columns:
        df['sanctioned_amount'] = 0.0
    
    df['sanctioned_amount'] = pd.to_numeric(df['sanctioned_amount'], errors='coerce').fillna(0.0)
    
    results = []
    
    # Group by category to find category-specific benchmarks
    for category, group in df.groupby('category'):
        amounts = group['sanctioned_amount'].values
        count = len(amounts)
        
        if count >= 3:
            median_val = float(np.median(amounts))
            q25 = float(np.percentile(amounts, 25))
            q75 = float(np.percentile(amounts, 75))
            iqr = q75 - q25
            upper_fence = q75 + 1.5 * iqr
            std_val = float(np.std(amounts)) if np.std(amounts) > 0 else 1.0
            mean_val = float(np.mean(amounts))
        else:
            median_val = float(np.median(amounts)) if count > 0 else 0.0
            q25 = median_val * 0.8
            q75 = median_val * 1.2
            upper_fence = median_val * 1.8
            std_val = 1.0
            mean_val = median_val

        for _, row in group.iterrows():
            cost = float(row['sanctioned_amount'])
            z_score = float((cost - mean_val) / std_val) if std_val > 0 else 0.0
            dev_pct = float(((cost - median_val) / median_val) * 100.0) if median_val > 0 else 0.0
            
            # Anomaly severity score (0 - 100 scale, normalized to 0 - 25 contribution)
            is_outlier = cost > upper_fence and count >= 3 and dev_pct > 35.0
            
            # Cost risk contribution (0 to 25 pts)
            if dev_pct <= 15:
                cost_score = 0.0
                severity = "NORMAL"
            elif dev_pct <= 40:
                cost_score = 8.0
                severity = "LOW_RISK"
            elif dev_pct <= 80:
                cost_score = 16.0
                severity = "MEDIUM_RISK"
            else:
                cost_score = 25.0
                severity = "HIGH_RISK"
                
            results.append({
                "work_id": str(row.get("work_id", "")),
                "category": category,
                "sanctioned_amount": cost,
                "peer_median": round(median_val, 2),
                "peer_q25": round(q25, 2),
                "peer_q75": round(q75, 2),
                "peer_range_max": round(upper_fence, 2),
                "deviation_percentage": round(dev_pct, 2),
                "z_score": round(z_score, 2),
                "comparable_count": count,
                "is_cost_anomaly": is_outlier or dev_pct > 50.0,
                "cost_risk_score": round(cost_score, 1),
                "severity": severity,
                "explanation": f"Cost is {round(dev_pct, 1)}% above the peer median (₹{round(median_val/100000, 2)}L) for {category} works ({count} peers analysed)." if dev_pct > 25.0 else "Cost is within normal peer range."
            })
            
    return results
