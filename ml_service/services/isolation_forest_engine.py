from typing import Dict, List, Any
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

def run_isolation_forest_anomaly(records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Multivariate ML Anomaly Detection using Scikit-Learn Isolation Forest.
    Combines cost, progress, timeline duration, and expenditure ratios.
    Never claims to be a 95% fraud classifier without ground truth labels.
    """
    if not records:
        return []
        
    df = pd.DataFrame(records)
    n_samples = len(df)
    
    # Ensure columns exist in DataFrame
    if 'sanctioned_amount' not in df.columns:
        df['sanctioned_amount'] = 0.0
    if 'expenditure_amount' not in df.columns:
        df['expenditure_amount'] = 0.0
    if 'progress_percentage' not in df.columns:
        df['progress_percentage'] = 0.0
    
    sanctioned = pd.to_numeric(df['sanctioned_amount'], errors='coerce').fillna(0.0)
    expenditure = pd.to_numeric(df['expenditure_amount'], errors='coerce').fillna(0.0)
    progress_pct = pd.to_numeric(df['progress_percentage'], errors='coerce').fillna(0.0)
    
    # Ratios
    expenditure_ratio = (expenditure / (sanctioned + 1.0)).clip(0.0, 3.0)
    progress_ratio = (progress_pct / 100.0).clip(0.0, 1.0)
    
    # Mismatch between fund spend and physical progress
    spend_progress_gap = (expenditure_ratio - progress_ratio).clip(-1.0, 2.0)
    
    # If too few samples, return baseline scores
    if n_samples < 5:
        results = []
        for i, r in enumerate(records):
            results.append({
                "work_id": str(r.get("work_id", "")),
                "iforest_score": 0.0,
                "is_multivariate_anomaly": False,
                "anomaly_contribution": 0.0,
                "feature_importance": {"cost": 0.2, "timeline": 0.2, "progress": 0.2, "expenditure": 0.4}
            })
        return results
        
    # Build feature matrix
    feature_matrix = np.column_stack([
        sanctioned.values,
        expenditure.values,
        expenditure_ratio.values,
        progress_pct.values,
        spend_progress_gap.values
    ])
    
    # Scale features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(feature_matrix)
    
    # Contamination parameter: ~10% expected unusual multivariate patterns
    iso = IsolationForest(
        n_estimators=100,
        contamination=0.10,
        random_state=42,
        max_samples='auto'
    )
    
    iso.fit(scaled_features)
    raw_scores = iso.decision_function(scaled_features) # Higher = more normal, Lower/Negative = more anomalous
    predictions = iso.predict(scaled_features)          # -1 for anomaly, 1 for normal
    
    min_score = float(np.min(raw_scores))
    max_score = float(np.max(raw_scores))
    score_range = max_score - min_score if (max_score - min_score) > 0 else 1.0
    
    results = []
    for i, r in enumerate(records):
        norm_intensity = (max_score - float(raw_scores[i])) / score_range # 0 (normal) to 1 (most anomalous)
        anomaly_pts = float(round(norm_intensity * 25.0, 1)) # 0 to 25 pts contribution
        is_anomaly = bool(predictions[i] == -1)
        
        results.append({
            "work_id": str(r.get("work_id", "")),
            "iforest_score": round(float(raw_scores[i]), 4),
            "anomaly_intensity": round(norm_intensity * 100.0, 1),
            "is_multivariate_anomaly": is_anomaly,
            "anomaly_contribution": anomaly_pts,
            "feature_importance": {
                "expenditure_progress_mismatch": round(float(abs(spend_progress_gap.iloc[i])), 2),
                "sanctioned_amount_weight": round(float(sanctioned.iloc[i]), 2),
                "reported_progress": round(float(progress_pct.iloc[i]), 1)
            }
        })
        
    return results
