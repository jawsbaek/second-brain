# Second Brain (Neo4j 2025.07.1 + FastAPI)

### Quickstart

- Start Neo4j

```bash
cd docker && docker compose up -d
```

- Apply indexes/seed

```bash
cd ..
make cypher
```

- Start API

```bash
cd api
uvicorn app.main:app --reload --port 8088
```

- Seed an example evidence

```bash
cd ..
make seed
```

### Env

Edit `api/.env` to set provider, model, and keys. Default uses OpenAI `text-embedding-3-small` (1536 dims).

### Notes

- Plugins enabled: APOC, GDS, GenAI
- Vector index name: `evidence_embedding_idx`
- Health check: GET http://localhost:8088/healthz
