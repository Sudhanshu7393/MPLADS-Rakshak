from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from services.cost_engine import analyze_cost_anomalies
from services.delay_engine import analyze_delays
from services.similarity_engine import detect_similar_works
from services.isolation_forest_engine import run_isolation_forest_anomaly
from services.agency_profile_engine import analyze_agency_profiles
from services.evidence_engine import evaluate_project_evidence

app = FastAPI(
    title="MPLADS Rakshak ML & Risk Intelligence Service",
    description="Python FastAPI service handling Anomaly Detection, Isolation Forest, NLP/Geo Similarity, and Evidence Evaluation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkRecord(BaseModel):
    work_id: str
    work_name: Optional[str] = ""
    category: Optional[str] = "General"
    sub_category: Optional[str] = ""
    state: Optional[str] = ""
    district: Optional[str] = ""
    constituency: Optional[str] = ""
    block: Optional[str] = ""
    village: Optional[str] = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    recommended_amount: Optional[float] = 0.0
    sanctioned_amount: Optional[float] = 0.0
    expenditure_amount: Optional[float] = 0.0
    progress_percentage: Optional[float] = 0.0
    recommendation_date: Optional[str] = None
    sanction_date: Optional[str] = None
    start_date: Optional[str] = None
    expected_completion_date: Optional[str] = None
    actual_completion_date: Optional[str] = None
    status: Optional[str] = "Ongoing"
    implementing_agency_name: Optional[str] = ""
    document_count: Optional[int] = 3
    photo_count: Optional[int] = 2

class BatchAnalysisRequest(BaseModel):
    records: List[Dict[str, Any]]
    weights: Optional[Dict[str, float]] = {
        "cost": 0.25,
        "delay": 0.20,
        "rule": 0.20,
        "similarity": 0.15,
        "agency": 0.10,
        "fund_evidence": 0.10
    }

@app.get("/")
def root():
    return {
        "service": "MPLADS Rakshak AI Engine",
        "status": "HEALTHY",
        "mode": "Production Ready",
        "version": "1.0.0",
        "supported_engines": ["cost_iqr", "delay_analyzer", "tfidf_duplicate_matcher", "isolation_forest", "agency_profiler", "evidence_audit"]
    }

@app.get("/ml/health")
def health_check():
    return {
        "status": "UP",
        "models": {
            "isolation_forest": "Ready",
            "tfidf_similarity": "Ready",
            "cost_benchmarker": "Ready",
            "delay_analyzer": "Ready",
            "evidence_evaluator": "Ready"
        }
    }

@app.post("/ml/anomaly/cost")
def cost_anomalies_endpoint(req: BatchAnalysisRequest):
    return analyze_cost_anomalies(req.records)

@app.post("/ml/anomaly/delay")
def delay_anomalies_endpoint(req: BatchAnalysisRequest):
    return analyze_delays(req.records)

@app.post("/ml/anomaly/isolation-forest")
def isolation_forest_endpoint(req: BatchAnalysisRequest):
    return run_isolation_forest_anomaly(req.records)

@app.post("/ml/similarity")
def similarity_endpoint(req: BatchAnalysisRequest):
    return detect_similar_works(req.records)

@app.post("/ml/agency/profile")
def agency_profile_endpoint(req: BatchAnalysisRequest):
    return analyze_agency_profiles(req.records)

@app.post("/ml/evidence/evaluate")
def evaluate_evidence_endpoint(work: Dict[str, Any]):
    return evaluate_project_evidence(work)

@app.post("/ml/analyze-all")
def analyze_all_endpoint(req: BatchAnalysisRequest):
    """
    Comprehensive pipeline running all detection algorithms simultaneously
    and synthesizing explainable risk scores.
    """
    records = req.records
    if not records:
        return {"scores": {}, "agencies": {}, "similar_works": {}}
        
    cost_res = {item['work_id']: item for item in analyze_cost_anomalies(records)}
    delay_res = {item['work_id']: item for item in analyze_delays(records)}
    iforest_res = {item['work_id']: item for item in run_isolation_forest_anomaly(records)}
    sim_res = detect_similar_works(records)
    agency_res = analyze_agency_profiles(records)
    
    agencies_map = agency_res.get("agencies", {})
    
    combined_scores = {}
    
    for r in records:
        w_id = str(r.get("work_id", ""))
        c_item = cost_res.get(w_id, {})
        d_item = delay_res.get(w_id, {})
        if_item = iforest_res.get(w_id, {})
        s_list = sim_res.get(w_id, [])
        ev_item = evaluate_project_evidence(r)
        
        agency_name = str(r.get("implementing_agency_name", "")).strip()
        a_item = agencies_map.get(agency_name, {})
        
        # Subscores
        cost_pts = c_item.get("cost_risk_score", 0.0)
        delay_pts = d_item.get("delay_risk_score", 0.0)
        ml_pts = if_item.get("anomaly_contribution", 0.0)
        
        sim_pts = 0.0
        if s_list:
            top_sim = s_list[0].get("similarity_score", 0.0)
            if top_sim > 85.0:
                sim_pts = 15.0
            elif top_sim > 70.0:
                sim_pts = 9.0
            else:
                sim_pts = 4.0
                
        agency_pts = a_item.get("agency_risk_score", 0.0)
        evidence_pts = ev_item.get("missing_risk_points", 0.0)
        
        # Rule check: Deterministic red flags
        rule_pts = 0.0
        reasons = []
        evidence_summary = []
        
        if c_item.get("is_cost_anomaly"):
            rule_pts += 10.0
            reasons.append("Sanctioned cost significantly deviates from category peer median")
            evidence_summary.append({
                "type": "COST_ANOMALY",
                "label": "Cost Outlier in Category",
                "detail": c_item.get("explanation"),
                "peer_median": c_item.get("peer_median"),
                "deviation_pct": c_item.get("deviation_percentage")
            })
            
        if d_item.get("is_delayed"):
            rule_pts += 10.0
            reasons.append(f"Execution milestone delayed by {d_item.get('delay_days')} days")
            evidence_summary.append({
                "type": "TIMELINE_DELAY",
                "label": "Milestone Delay",
                "detail": d_item.get("explanation"),
                "delay_days": d_item.get("delay_days")
            })
            
        if s_list:
            reasons.append("Potentially similar / duplicate work detected nearby")
            evidence_summary.append({
                "type": "DUPLICATE_WORK",
                "label": "Potentially Overlapping Work",
                "detail": f"{len(s_list)} similar proposal(s) found. Closest match: {s_list[0].get('target_work_id')} ({s_list[0].get('similarity_score')}% similarity)",
                "similar_count": len(s_list),
                "top_similarity": s_list[0].get("similarity_score")
            })
            
        if agency_pts > 0:
            reasons.append(f"Unusual agency concentration: {a_item.get('explanation')}")
            evidence_summary.append({
                "type": "AGENCY_PATTERN",
                "label": "Agency Work Concentration",
                "detail": a_item.get("explanation")
            })
            
        if ev_item.get("missing_count", 0) > 0:
            reasons.append(f"Required compliance documentation missing ({ev_item.get('missing_count')} mandatory file(s))")
            evidence_summary.append({
                "type": "MISSING_EVIDENCE",
                "label": "Missing Compliance Evidence",
                "detail": f"{ev_item.get('missing_count')} mandatory artifact(s) not uploaded."
            })
            
        # Composite score calculation (Direct 100-point transparent scale)
        # Cost (25) + Delay (20) + Rules (20) + Similarity (15) + Agency (10) + Evidence (10) = 100 pts
        direct_sum = cost_pts + delay_pts + rule_pts + sim_pts + agency_pts + min(10.0, evidence_pts)
        scaled_score = min(98, max(4, int(round(direct_sum))))
        
        # Risk level categorization
        if scaled_score >= 70:
            risk_level = "HIGH"
            priority = "PRIORITY_1"
        elif scaled_score >= 40:
            risk_level = "MEDIUM"
            priority = "PRIORITY_2"
        else:
            risk_level = "LOW"
            priority = "PRIORITY_3"
            
        # Confidence score based on field completeness
        confidence = "HIGH" if (r.get("sanction_date") and r.get("category") and r.get("latitude")) else "MEDIUM"
        
        combined_scores[w_id] = {
            "work_id": w_id,
            "risk_score": scaled_score,
            "risk_level": risk_level,
            "priority": priority,
            "confidence": confidence,
            "subscores": {
                "cost_anomaly": cost_pts,
                "delay_anomaly": delay_pts,
                "rule_violation": rule_pts,
                "similarity_duplicate": sim_pts,
                "agency_concentration": agency_pts,
                "missing_evidence": evidence_pts,
                "isolation_forest_ml": ml_pts
            },
            "reasons": reasons if reasons else ["Work indicators are within normal historical variance"],
            "evidence": evidence_summary,
            "evidence_center": ev_item,
            "similar_works": s_list,
            "peer_comparison": c_item,
            "delay_details": d_item,
            "agency_profile": a_item
        }
        
    return {
        "status": "SUCCESS",
        "analyzed_count": len(records),
        "scores": combined_scores,
        "agencies": agency_res.get("agencies", {}),
        "graph_data": agency_res.get("graph_data", {})
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
