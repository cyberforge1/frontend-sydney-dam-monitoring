# ==============================================================
# Dam Monitoring API - Curl Commands (via Vite proxy at 5173)
# ==============================================================

# 1. Dams
curl -sS "http://localhost:5173/api/dams/"

curl -sS "http://localhost:5173/api/dams/210102"

# 2. Latest Dam Data
curl -sS "http://localhost:5173/api/latest_data/"

curl -sS "http://localhost:5173/api/latest_data/210102"

# 3. Specific Dam Analysis
curl -sS "http://localhost:5173/api/specific_dam_analysis/210102"

# 4. Dam Groups
curl -sS "http://localhost:5173/api/dam_groups/"

curl -sS "http://localhost:5173/api/dam_groups/Sydney%20Metro"

curl -sS "http://localhost:5173/api/dam_group_members/Sydney%20Metro/"

# 5. Overall Dam Analysis
curl -sS "http://localhost:5173/api/overall_dam_analysis/"

curl -sS "http://localhost:5173/api/overall_dam_analysis/2024-12-31"
