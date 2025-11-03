# test_key.py
import requests

API_KEY = "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"
url = "https://integrate.api.nvidia.com/v1/models"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")