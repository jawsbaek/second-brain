#!/usr/bin/env bash
set -euo pipefail
NEO4J_URI="${NEO4J_URI:-http://localhost:7474}"
curl -s -X POST "http://localhost:8088/evidences" -H "Content-Type: application/json" -d '{
  "url":"https://example.com/blog/keycloak-sso",
  "title":"Keycloak SSO 사례",
  "source":"Blog",
  "published_at":"2025-07-01T00:00:00Z",
  "text":"Keycloak로 OIDC 기반 SSO를 구현했다...",
  "visibility":"team"
}'


