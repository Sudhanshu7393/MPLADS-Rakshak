import urllib.request
import json

payload = {
    "records": [
        {
            "work_id": "MPL-2024-UP-004821",
            "work_name": "Construction of CC Road from Main Chowk to Panchayat Bhawan, Village Rampur",
            "category": "Rural Roads & Bridges",
            "sanctioned_amount": 4800000.0,
            "status": "Ongoing",
            "progress_percentage": 45.0,
            "sanction_date": "2023-10-25",
            "expected_completion_date": "2024-05-30",
            "document_count": 2,
            "photo_count": 1,
            "has_completion_certificate": False,
            "implementing_agency_name": "XYZ Infrastructure & Construction Private Ltd"
        },
        {
            "work_id": "MPL-2024-UP-004822",
            "work_name": "Construction of Concrete CC Road from Main Chowk to Gram Panchayat Bhawan, Rampur",
            "category": "Rural Roads & Bridges",
            "sanctioned_amount": 4650000.0,
            "status": "Ongoing",
            "progress_percentage": 40.0,
            "sanction_date": "2023-11-10",
            "expected_completion_date": "2024-06-15",
            "document_count": 2,
            "photo_count": 1,
            "has_completion_certificate": False,
            "implementing_agency_name": "XYZ Infrastructure & Construction Private Ltd"
        }
    ]
}

req = urllib.request.Request(
    "http://127.0.0.1:8000/ml/analyze-all",
    data=json.dumps(payload).encode('utf-8'),
    headers={"Content-Type": "application/json"}
)

try:
    with urllib.request.urlopen(req) as response:
        print("HTTP Status:", response.status)
        data = json.loads(response.read().decode('utf-8'))
        print("Analysis Status:", data.get("status"))
        print("MPL-2024-UP-004821 Score:", data["scores"]["MPL-2024-UP-004821"]["risk_score"])
        print("Risk Level:", data["scores"]["MPL-2024-UP-004821"]["risk_level"])
        print("Reasons:", data["scores"]["MPL-2024-UP-004821"]["reasons"])
except Exception as e:
    print("Error:", e)
