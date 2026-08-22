import math
from typing import Dict, List, Any
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in meters."""
    if lat1 is None or lon1 is None or lat2 is None or lon2 is None:
        return -1.0
    try:
        lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
        if lat1 == 0.0 and lon1 == 0.0:
            return -1.0
    except (ValueError, TypeError):
        return -1.0
        
    R = 6371000  # Radius of earth in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c

def detect_similar_works(records: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """
    Identifies potentially duplicate or overlapping MPLADS works using
    TF-IDF character & word n-grams, category grouping, and geospatial proximity.
    """
    if len(records) < 2:
        return {}
        
    df = pd.DataFrame(records)
    if 'work_id' not in df.columns or 'work_name' not in df.columns:
        return {}
        
    # Prepare text corpus
    text_corpus = []
    for _, row in df.iterrows():
        name = str(row.get('work_name', '')).lower()
        cat = str(row.get('category', '')).lower()
        subcat = str(row.get('sub_category', '')).lower()
        block = str(row.get('block', '')).lower()
        village = str(row.get('village', '')).lower()
        combined = f"{name} {cat} {subcat} {block} {village}"
        text_corpus.append(combined)
        
    # TF-IDF Vectorizer with ngram (word & character)
    vectorizer = TfidfVectorizer(ngram_range=(1, 3), analyzer='word', min_df=1, stop_words='english')
    try:
        tfidf_matrix = vectorizer.fit_transform(text_corpus)
        sim_matrix = cosine_similarity(tfidf_matrix)
    except Exception:
        return {}
        
    similar_works_map: Dict[str, List[Dict[str, Any]]] = {}
    n = len(df)
    
    for i in range(n):
        work_i = df.iloc[i]
        id_i = str(work_i.get('work_id'))
        similar_list = []
        
        for j in range(n):
            if i == j:
                continue
            
            sim_score = float(sim_matrix[i, j])
            work_j = df.iloc[j]
            id_j = str(work_j.get('work_id'))
            
            # Check location proximity if coordinates available
            lat1, lon1 = work_i.get('latitude'), work_i.get('longitude')
            lat2, lon2 = work_j.get('latitude'), work_j.get('longitude')
            dist_meters = haversine_distance(lat1, lon1, lat2, lon2)
            
            same_district = str(work_i.get('district', '')).strip().lower() == str(work_j.get('district', '')).strip().lower()
            same_category = str(work_i.get('category', '')).strip().lower() == str(work_j.get('category', '')).strip().lower()
            same_agency = str(work_i.get('implementing_agency_name', '')).strip().lower() == str(work_j.get('implementing_agency_name', '')).strip().lower()
            
            matching_factors = []
            if sim_score > 0.70:
                matching_factors.append(f"High text & title similarity ({round(sim_score * 100, 1)}%)")
            if same_category:
                matching_factors.append(f"Identical category ({work_i.get('category')})")
            if same_district:
                matching_factors.append(f"Same district ({work_i.get('district')})")
            if same_agency and str(work_i.get('implementing_agency_name', '')) != '':
                matching_factors.append(f"Same implementing agency ({work_i.get('implementing_agency_name')})")
                
            is_potential_duplicate = False
            
            # Geo proximity match
            if 0 <= dist_meters <= 1500 and sim_score > 0.65:
                matching_factors.append(f"Geographic proximity ({round(dist_meters)} meters apart)")
                is_potential_duplicate = True
            elif same_district and sim_score > 0.78:
                is_potential_duplicate = True
            elif dist_meters >= 0 and dist_meters <= 500 and same_category:
                matching_factors.append(f"Extreme location proximity ({round(dist_meters)}m) in same category")
                is_potential_duplicate = True
                
            if is_potential_duplicate:
                similar_list.append({
                    "target_work_id": id_j,
                    "target_work_name": str(work_j.get('work_name', '')),
                    "target_district": str(work_j.get('district', '')),
                    "target_category": str(work_j.get('category', '')),
                    "target_sanctioned_amount": float(work_j.get('sanctioned_amount', 0.0) or 0.0),
                    "target_sanction_date": str(work_j.get('sanction_date', '')),
                    "target_agency": str(work_j.get('implementing_agency_name', '')),
                    "similarity_score": round(sim_score * 100.0, 1),
                    "distance_meters": round(dist_meters, 1) if dist_meters >= 0 else None,
                    "matching_factors": matching_factors
                })
                
        # Sort by similarity score descending
        similar_list.sort(key=lambda x: x['similarity_score'], reverse=True)
        if similar_list:
            similar_works_map[id_i] = similar_list[:5] # Top 5 similar works
            
    return similar_works_map
