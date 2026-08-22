import csv
import random
import os
from datetime import datetime, timedelta

random.seed(20260823)

os.makedirs("data/demo", exist_ok=True)
os.makedirs("data/public_sample", exist_ok=True)

CATEGORIES = [
    ("Rural Roads & Bridges", ["CC Road Construction", "Culvert & Drainage Bridge", "Paver Block Road", "Link Road Widening"], 1500000, 4500000),
    ("Drinking Water", ["Deep Borewell & Solar Pump System", "RO Water Treatment Plant", "Piped Water Overhead Tank", "Hand Pump Installation Cluster"], 500000, 2500000),
    ("Education & Classrooms", ["Additional Classroom Building", "School Science Laboratory", "Smart Digital Library Block", "School Boundary Wall & Sanitation"], 800000, 3500000),
    ("Community Infrastructure", ["Panchayat Community Hall", "Senior Citizen Recreation Shed", "Crematorium Shed with Amenities", "Public Bus Passenger Shelter"], 1000000, 4000000),
    ("Health & Sanitation", ["Primary Health Sub-Centre Building", "Community Public Toilet Complex", "Village Waste Segregation Shed", "Health Diagnostic Equipment"], 700000, 3000000),
    ("Solar & Renewable Energy", ["Solar Street Light Grid (50 poles)", "Rooftop Solar for Govt Hospital", "High-Mast Solar Lighting Chowk"], 400000, 1800000)
]

LOCATIONS = [
    {"state": "Uttar Pradesh", "district": "Varanasi", "constituency": "Varanasi", "lat": 25.3176, "lon": 82.9739, "blocks": ["Kashi Vidyapeeth", "Pindra", "Sewapuri", "Arajiline", "Cholapur"], "villages": ["Rampur", "Shivpur", "Chhatar", "Badagaon", "Tikari", "Babatpur", "Harahua"]},
    {"state": "Maharashtra", "district": "Thane", "constituency": "Thane", "lat": 19.2183, "lon": 72.9781, "blocks": ["Kalyan", "Ambernath", "Bhiwandi", "Murbad", "Shahapur"], "villages": ["Khadavali", "Titwala", "Padgha", "Vashind", "Saralgaon", "Tokawade"]},
    {"state": "Bihar", "district": "Patna", "constituency": "Patna Sahib", "lat": 25.5941, "lon": 85.1376, "blocks": ["Phulwari Sharif", "Danapur", "Sampatchak", "Fatuha", "Bakhtiarpur"], "villages": ["Ranipur", "Sabbalpur", "Jethuli", "Baikatpur", "Gauri Chak"]},
    {"state": "Rajasthan", "district": "Jaipur", "constituency": "Jaipur Rural", "lat": 26.9124, "lon": 75.7873, "blocks": ["Sanganer", "Amer", "Chaksu", "Kotputli", "Shahpura"], "villages": ["Bassi", "Kukas", "Manoharpur", "Achrol", "Bagru", "Nayla"]},
    {"state": "Karnataka", "district": "Bengaluru Urban", "constituency": "Bangalore North", "lat": 12.9716, "lon": 77.5946, "blocks": ["Yelahanka", "Bengaluru North", "K.R. Puram", "Anekal"], "villages": ["Mandur", "Hesaraghatta", "Attibele", "Doddaballapur Rd", "Singanayakanahalli"]},
    {"state": "Assam", "district": "Kamrup", "constituency": "Gauhati", "lat": 26.1445, "lon": 91.7362, "blocks": ["Hajo", "Rangia", "Kamalpur", "Bezera", "Chaygaon"], "villages": ["Dadara", "Sualkuchi", "Puthimari", "Boko", "Mirza"]},
    {"state": "West Bengal", "district": "Nadia", "constituency": "Krishnanagar", "lat": 23.4013, "lon": 88.5002, "blocks": ["Nabadwip", "Krishnanagar-I", "Nakashipara", "Chapra"], "villages": ["Mayapur", "Dhubulia", "Bethuadahari", "Tehatta", "Debagram"]},
    {"state": "Kerala", "district": "Ernakulam", "constituency": "Ernakulam", "lat": 9.9816, "lon": 76.2999, "blocks": ["Aluva", "Angamaly", "Paravur", "Vyttila", "Muvattupuzha"], "villages": ["Kalamassery", "Edappally", "Cherai", "Kothamangalam", "Perumbavoor"]}
]

AGENCIES = [
    ("AGY-PWD-01", "Public Works Department (PWD) Division I"),
    ("AGY-RWD-02", "Rural Works Department (RWD) Engineering Wing"),
    ("AGY-ZP-03", "Zila Parishad Rural Infrastructure Cell"),
    ("AGY-DRDA-04", "District Rural Development Agency (DRDA)"),
    ("AGY-WSS-05", "Public Health Engineering & Water Supply Dept"),
    ("AGY-XYZ-99", "XYZ Infrastructure & Construction Private Ltd")  # Deliberate agency concentration entity
]

def generate_records(num_records=1600):
    records = []
    
    # 1. Deliberate Flagged Injections for Clear Explainable Demonstration
    
    # Scenario A: Severe Cost Outlier (2.3x peer median for CC Road)
    rec_cost_anomaly = {
        "work_id": "MPL-2024-UP-004821",
        "recommendation_id": "REC-2023-9901",
        "mp_id": "MP-LS-17-084",
        "mp_name": "Shri Ramakant Sharma (Hon'ble MP)",
        "work_name": "Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur",
        "category": "Rural Roads & Bridges",
        "sub_category": "CC Road Construction",
        "state": "Uttar Pradesh",
        "district": "Varanasi",
        "constituency": "Varanasi",
        "block": "Kashi Vidyapeeth",
        "village": "Rampur",
        "latitude": 25.3210,
        "longitude": 82.9765,
        "recommended_amount": 4800000.0,
        "sanctioned_amount": 4800000.0,
        "expenditure_amount": 4200000.0,
        "remaining_amount": 600000.0,
        "recommendation_date": "2023-08-10",
        "sanction_date": "2023-10-25",
        "start_date": "2023-11-15",
        "expected_completion_date": "2024-05-30",
        "actual_completion_date": "",
        "status": "Ongoing",
        "progress_percentage": 45.0,
        "implementing_agency_id": "AGY-XYZ-99",
        "implementing_agency_name": "XYZ Infrastructure & Construction Private Ltd",
        "document_count": 2,
        "photo_count": 1,
        "has_completion_certificate": False,
        "source_type": "DEMO/SYNTHETIC DATA"
    }
    records.append(rec_cost_anomaly)
    
    # Scenario B: High Similarity / Potentially Overlapping Duplicate Work (420 meters away, 92% similarity)
    rec_duplicate_nearby = {
        "work_id": "MPL-2024-UP-004822",
        "recommendation_id": "REC-2023-9902",
        "mp_id": "MP-LS-17-084",
        "mp_name": "Shri Ramakant Sharma (Hon'ble MP)",
        "work_name": "Construction of Concrete CC Road from Main Chowk to Gram Panchayat Bhawan, Rampur",
        "category": "Rural Roads & Bridges",
        "sub_category": "CC Road Construction",
        "state": "Uttar Pradesh",
        "district": "Varanasi",
        "constituency": "Varanasi",
        "block": "Kashi Vidyapeeth",
        "village": "Rampur",
        "latitude": 25.3235,
        "longitude": 82.9780,
        "recommended_amount": 4650000.0,
        "sanctioned_amount": 4650000.0,
        "expenditure_amount": 3900000.0,
        "remaining_amount": 750000.0,
        "recommendation_date": "2023-09-02",
        "sanction_date": "2023-11-10",
        "start_date": "2023-12-01",
        "expected_completion_date": "2024-06-15",
        "actual_completion_date": "",
        "status": "Ongoing",
        "progress_percentage": 40.0,
        "implementing_agency_id": "AGY-XYZ-99",
        "implementing_agency_name": "XYZ Infrastructure & Construction Private Ltd",
        "document_count": 2,
        "photo_count": 1,
        "has_completion_certificate": False,
        "source_type": "DEMO/SYNTHETIC DATA"
    }
    records.append(rec_duplicate_nearby)

    # Scenario C: 100% Completed Project Missing Completion Certificate & Site Photos
    rec_missing_evidence = {
        "work_id": "MPL-2024-MH-001890",
        "recommendation_id": "REC-2023-7712",
        "mp_id": "MP-LS-17-112",
        "mp_name": "Smt. Anjali Kulkarni (Hon'ble MP)",
        "work_name": "Construction of High-Capacity Piped Water Overhead Tank at Titwala",
        "category": "Drinking Water",
        "sub_category": "Piped Water Overhead Tank",
        "state": "Maharashtra",
        "district": "Thane",
        "constituency": "Thane",
        "block": "Kalyan",
        "village": "Titwala",
        "latitude": 19.2980,
        "longitude": 73.2085,
        "recommended_amount": 2400000.0,
        "sanctioned_amount": 2400000.0,
        "expenditure_amount": 2400000.0,
        "remaining_amount": 0.0,
        "recommendation_date": "2023-04-12",
        "sanction_date": "2023-06-18",
        "start_date": "2023-07-01",
        "expected_completion_date": "2024-02-28",
        "actual_completion_date": "2024-03-10",
        "status": "Completed",
        "progress_percentage": 100.0,
        "implementing_agency_id": "AGY-WSS-05",
        "implementing_agency_name": "Public Health Engineering & Water Supply Dept",
        "document_count": 2, # Missing completion certificate
        "photo_count": 0, # Missing photos
        "has_completion_certificate": False,
        "source_type": "DEMO/SYNTHETIC DATA"
    }
    records.append(rec_missing_evidence)
    
    # Scenario D: Chronic Delay & Stagnant Execution (380+ days delayed)
    rec_chronic_delay = {
        "work_id": "MPL-2024-BR-003310",
        "recommendation_id": "REC-2023-4419",
        "mp_id": "MP-LS-17-045",
        "mp_name": "Shri Rajeshwar Prasad (Hon'ble MP)",
        "work_name": "Establishment of Primary Health Sub-Centre Building at Ranipur",
        "category": "Health & Sanitation",
        "sub_category": "Primary Health Sub-Centre Building",
        "state": "Bihar",
        "district": "Patna",
        "constituency": "Patna Sahib",
        "block": "Phulwari Sharif",
        "village": "Ranipur",
        "latitude": 25.5680,
        "longitude": 85.0740,
        "recommended_amount": 2800000.0,
        "sanctioned_amount": 2800000.0,
        "expenditure_amount": 1900000.0,
        "remaining_amount": 900000.0,
        "recommendation_date": "2023-02-15",
        "sanction_date": "2023-05-10",
        "start_date": "2023-06-01",
        "expected_completion_date": "2023-12-31",
        "actual_completion_date": "",
        "status": "Ongoing",
        "progress_percentage": 25.0,
        "implementing_agency_id": "AGY-XYZ-99",
        "implementing_agency_name": "XYZ Infrastructure & Construction Private Ltd",
        "document_count": 2,
        "photo_count": 1,
        "has_completion_certificate": False,
        "source_type": "DEMO/SYNTHETIC DATA"
    }
    records.append(rec_chronic_delay)

    # 2. Generate regular population of records (1,500+ items)
    for idx in range(5, num_records + 1):
        loc = random.choice(LOCATIONS)
        cat_info = random.choice(CATEGORIES)
        cat_name = cat_info[0]
        subcat_name = random.choice(cat_info[1])
        min_cost, max_cost = cat_info[2], cat_info[3]
        
        block = random.choice(loc["blocks"])
        village = random.choice(loc["villages"])
        
        # Base realistic cost within range
        base_cost = random.randint(min_cost, max_cost)
        sanctioned_amt = round(base_cost, -4)
        rec_amt = sanctioned_amt + (random.randint(0, 3) * 50000)
        
        # Jitter coordinates slightly around district center (within 5-15km)
        lat = round(loc["lat"] + random.uniform(-0.08, 0.08), 4)
        lon = round(loc["lon"] + random.uniform(-0.08, 0.08), 4)
        
        # Dates
        rec_date = datetime(2023, random.randint(1, 12), random.randint(1, 28))
        sanction_date = rec_date + timedelta(days=random.randint(20, 60))
        start_date = sanction_date + timedelta(days=random.randint(10, 30))
        expected_comp = start_date + timedelta(days=random.randint(120, 300))
        
        status_choice = random.choices(["Completed", "Ongoing", "Sanctioned"], weights=[0.45, 0.45, 0.10])[0]
        
        if status_choice == "Completed":
            actual_comp = expected_comp + timedelta(days=random.randint(-20, 40))
            expenditure = sanctioned_amt
            remaining = 0.0
            progress = 100.0
            doc_cnt = random.randint(4, 5)
            photo_cnt = random.randint(2, 4)
            has_comp_cert = True
        elif status_choice == "Ongoing":
            actual_comp = None
            progress = float(random.randint(20, 85))
            expenditure = round(sanctioned_amt * (progress / 100.0) * random.uniform(0.9, 1.1), -3)
            expenditure = min(expenditure, sanctioned_amt)
            remaining = sanctioned_amt - expenditure
            doc_cnt = random.randint(2, 4)
            photo_cnt = random.randint(1, 3)
            has_comp_cert = False
        else: # Sanctioned
            actual_comp = None
            progress = 0.0
            expenditure = 0.0
            remaining = sanctioned_amt
            doc_cnt = 2
            photo_cnt = 0
            has_comp_cert = False
            
        agency = random.choice(AGENCIES)
        # Give Agency-XYZ more concentration in Varanasi and Patna
        if loc["district"] in ["Varanasi", "Patna"] and random.random() < 0.45:
            agency = AGENCIES[5] # XYZ Infrastructure
            
        work_id = f"MPL-2024-{loc['state'][:2].upper()}-{idx:06d}"
        rec_id = f"REC-2023-{random.randint(1000, 9999)}"
        mp_id = f"MP-LS-17-{random.randint(10, 99)}"
        work_name = f"{subcat_name} at {village}, Block {block}"
        
        records.append({
            "work_id": work_id,
            "recommendation_id": rec_id,
            "mp_id": mp_id,
            "mp_name": f"Hon'ble Member of Parliament ({loc['constituency']})",
            "work_name": work_name,
            "category": cat_name,
            "sub_category": subcat_name,
            "state": loc["state"],
            "district": loc["district"],
            "constituency": loc["constituency"],
            "block": block,
            "village": village,
            "latitude": lat,
            "longitude": lon,
            "recommended_amount": float(rec_amt),
            "sanctioned_amount": float(sanctioned_amt),
            "expenditure_amount": float(expenditure),
            "remaining_amount": float(remaining),
            "recommendation_date": rec_date.strftime("%Y-%m-%d"),
            "sanction_date": sanction_date.strftime("%Y-%m-%d"),
            "start_date": start_date.strftime("%Y-%m-%d"),
            "expected_completion_date": expected_comp.strftime("%Y-%m-%d"),
            "actual_completion_date": actual_comp.strftime("%Y-%m-%d") if actual_comp else "",
            "status": status_choice,
            "progress_percentage": progress,
            "implementing_agency_id": agency[0],
            "implementing_agency_name": agency[1],
            "document_count": doc_cnt,
            "photo_count": photo_cnt,
            "has_completion_certificate": has_comp_cert,
            "source_type": "DEMO/SYNTHETIC DATA"
        })
        
    # Write to CSV
    fieldnames = list(records[0].keys())
    with open("data/demo/mplads_demo_dataset.csv", mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)
        
    # Write smaller public sample
    with open("data/public_sample/sample_public_mplads.csv", mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records[:200])

    print(f"Generated {len(records)} demo records in data/demo/mplads_demo_dataset.csv")

if __name__ == "__main__":
    generate_records(1600)
