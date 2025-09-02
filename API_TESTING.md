# ==============================================================
# Dam Monitoring API - Curl Commands (via Vite proxy at 5174)
# ==============================================================

# 0) Welcome
curl -sS "http://localhost:5174/api/" | jq

# 1) Dams (list + detail)
curl -sS "http://localhost:5174/api/dams/" | jq
curl -sS "http://localhost:5174/api/dams/" | jq 'length'
curl -sS "http://localhost:5174/api/dams/203042" | jq

# 2) Latest Dam Data (list + detail)
curl -sS "http://localhost:5174/api/latest_data/" | jq
curl -sS "http://localhost:5174/api/latest_data/203042" | jq

# 3) Dam Resources (list + detail)
curl -sS "http://localhost:5174/api/dam_resources/" | jq
curl -sS "http://localhost:5174/api/dam_resources/1" | jq

# 4) Specific Dam Analysis
curl -sS "http://localhost:5174/api/specific_dam_analysis/" | jq
curl -sS "http://localhost:5174/api/specific_dam_analysis/203042" | jq
curl -sS "http://localhost:5174/api/specific_dam_analysis/203042/2024-11-01" | jq

# 5) Dam Groups & Members
curl -sS "http://localhost:5174/api/dam_groups/" | jq
curl -sS "http://localhost:5174/api/dam_groups/greatest_released" | jq
curl -sS "http://localhost:5174/api/dam_group_members/" | jq
curl -sS "http://localhost:5174/api/dam_group_members/greatest_released" | jq

# 6) Overall Dam Analysis (list + date detail)
curl -sS "http://localhost:5174/api/overall_dam_analysis/" | jq
curl -sS "http://localhost:5174/api/overall_dam_analysis/2024-11-25" | jq
