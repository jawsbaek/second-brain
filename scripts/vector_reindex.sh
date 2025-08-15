#!/usr/bin/env bash
set -euo pipefail

docker exec -i neo4j-2025 cypher-shell -u neo4j -p test1234 "DROP INDEX evidence_embedding_idx IF EXISTS;"
docker exec -i neo4j-2025 cypher-shell -u neo4j -p test1234 "CREATE VECTOR INDEX evidence_embedding_idx IF NOT EXISTS FOR (e:Evidence) ON (e.embedding) OPTIONS {indexConfig: { 'vector.dimensions': 1536, 'vector.similarity_function':'cosine' }};"


