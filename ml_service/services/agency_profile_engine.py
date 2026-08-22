from typing import Dict, List, Any
from collections import defaultdict
import pandas as pd
import networkx as nx

def analyze_agency_profiles(records: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Evaluates agency concentration, risk density, and constructs
    entity relationship graph (MP - District - Agency - Work).
    Uses neutral language: 'Unusual concentration of works' rather than 'corrupt'.
    """
    if not records:
        return {"agencies": {}, "graph_data": {"nodes": [], "links": []}}
        
    df = pd.DataFrame(records)
    
    agency_stats = defaultdict(lambda: {
        "total_works": 0,
        "total_value": 0.0,
        "districts": set(),
        "categories": set(),
        "work_ids": [],
        "delayed_count": 0
    })
    
    district_totals = defaultdict(lambda: {"count": 0, "value": 0.0})
    
    for _, row in df.iterrows():
        agency = str(row.get('implementing_agency_name', '')).strip()
        if not agency or agency.lower() == 'nan' or agency.lower() == 'none':
            agency = "Unassigned / Direct Department"
            
        dist = str(row.get('district', 'Unknown')).strip()
        cost = float(row.get('sanctioned_amount', 0.0) or 0.0)
        work_id = str(row.get('work_id', ''))
        cat = str(row.get('category', 'General'))
        
        agency_stats[agency]["total_works"] += 1
        agency_stats[agency]["total_value"] += cost
        agency_stats[agency]["districts"].add(dist)
        agency_stats[agency]["categories"].add(cat)
        agency_stats[agency]["work_ids"].append(work_id)
        
        district_totals[dist]["count"] += 1
        district_totals[dist]["value"] += cost

    # Calculate concentration scores
    agencies_result = {}
    for agency, stats in agency_stats.items():
        total_works = stats["total_works"]
        total_val = stats["total_value"]
        
        # Check district concentration
        max_dist_share = 0.0
        primary_district = "Multiple"
        for dist in stats["districts"]:
            d_total = district_totals[dist]["count"]
            if d_total > 0:
                share = (total_works / d_total) * 100.0
                if share > max_dist_share:
                    max_dist_share = share
                    primary_district = dist
                    
        # Agency Risk Score (0 to 10 pts contribution)
        if total_works >= 5 and max_dist_share > 50.0:
            agency_risk_score = 10.0
            concentration_label = "HIGH_CONCENTRATION"
            explanation = f"Handles {round(max_dist_share, 1)}% of all MPLADS works in {primary_district}."
        elif total_works >= 3 and max_dist_share > 35.0:
            agency_risk_score = 6.0
            concentration_label = "MODERATE_CONCENTRATION"
            explanation = f"Notable concentration ({round(max_dist_share, 1)}%) in {primary_district}."
        else:
            agency_risk_score = 0.0
            concentration_label = "NORMAL"
            explanation = "Normal workload distribution across administrative agencies."
            
        agencies_result[agency] = {
            "agency_name": agency,
            "total_works": total_works,
            "total_value": round(total_val, 2),
            "districts_count": len(stats["districts"]),
            "primary_district": primary_district,
            "district_share_pct": round(max_dist_share, 1),
            "concentration_label": concentration_label,
            "agency_risk_score": agency_risk_score,
            "explanation": explanation
        }
        
    # Build Network Graph (Nodes & Links for React Flow/Graph View)
    G = nx.Graph()
    nodes = []
    links = []
    
    # Sample top relationships to avoid graph clutter
    seen_nodes = set()
    
    for r in records[:60]: # Top 60 for interactive graph view
        w_id = str(r.get('work_id'))
        w_name = str(r.get('work_name', 'Work'))[:25]
        agency = str(r.get('implementing_agency_name', 'Unassigned'))
        dist = str(r.get('district', 'District'))
        
        # Work Node
        if w_id not in seen_nodes:
            seen_nodes.add(w_id)
            nodes.append({"id": w_id, "label": w_name, "type": "work", "category": str(r.get('category'))})
            
        # Agency Node
        agency_node_id = f"agency_{agency}"
        if agency_node_id not in seen_nodes:
            seen_nodes.add(agency_node_id)
            nodes.append({"id": agency_node_id, "label": agency, "type": "agency"})
            
        # District Node
        dist_node_id = f"district_{dist}"
        if dist_node_id not in seen_nodes:
            seen_nodes.add(dist_node_id)
            nodes.append({"id": dist_node_id, "label": dist, "type": "district"})
            
        links.append({"source": w_id, "target": agency_node_id, "relationship": "EXECUTED_BY"})
        links.append({"source": w_id, "target": dist_node_id, "relationship": "LOCATED_IN"})

    return {
        "agencies": agencies_result,
        "graph_data": {
            "nodes": nodes,
            "links": links
        }
    }
