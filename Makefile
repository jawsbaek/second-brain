.PHONY: up down api seed cypher

up:
	cd docker && docker compose up -d

down:
	cd docker && docker compose down -v

api:
	cd api && uvicorn app.main:app --reload --port 8088

seed:
	bash scripts/seed.sh

cypher:
	docker exec -i neo4j-2025 cypher-shell -u neo4j -p test1234 < db/cypher/01_constraints.cypher && \
	docker exec -i neo4j-2025 cypher-shell -u neo4j -p test1234 < db/cypher/02_indexes.cypher && \
	docker exec -i neo4j-2025 cypher-shell -u neo4j -p test1234 < db/cypher/03_seed.cypher


