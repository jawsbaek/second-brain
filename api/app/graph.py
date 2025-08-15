import os
from .deps import get_session


EMBED_DIM = int(os.getenv("EMBED_DIM", "1536"))
PROVIDER = os.getenv("EMBED_PROVIDER", "openai")
MODEL = os.getenv("EMBED_MODEL", "text-embedding-3-small")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def ensure_indexes():
    with get_session() as s:
        s.run(
            """
        CREATE VECTOR INDEX evidence_embedding_idx IF NOT EXISTS
        FOR (e:Evidence) ON (e.embedding)
        OPTIONS { indexConfig: {
          'vector.dimensions': $dim, 'vector.similarity_function':'cosine'
        }};
        """,
            dim=EMBED_DIM,
        )


def upsert_evidence(ev):
    with get_session() as s:
        rec = s.run(
            """
        CALL genai.vector.encode($text, {
          provider: $provider,
          model: $model,
          apiKey: $apiKey
        }) YIELD embedding
        MERGE (e:Evidence {url:$url})
        SET e.title=$title, e.source=$source,
            e.published_at=date($published_at),
            e.visibility=$visibility,
            e.embedding=embedding
        RETURN id(e) AS id
        """,
            text=ev.text,
            provider=PROVIDER,
            model=MODEL,
            apiKey=OPENAI_API_KEY,
            url=str(ev.url),
            title=ev.title,
            source=ev.source,
            published_at=ev.published_at.date().isoformat(),
            visibility=ev.visibility,
        ).single()
        return rec["id"]


def create_link(link):
    with get_session() as s:
        s.run(
            f"""
        MATCH (a),(b)
        WHERE id(a) = $src AND id(b) = $dst
        MERGE (a)-[r:{link.rel}]->(b)
        SET r.weight=$weight, r.confidence=$confidence, r.timestamp=date($ts)
        """,
            src=int(link.src_id),
            dst=int(link.dst_id),
            weight=link.weight,
            confidence=link.confidence,
            ts=link.timestamp.date().isoformat(),
        )


def vector_search(query, k=5):
    with get_session() as s:
        rec = s.run(
            """
        CALL genai.vector.encode($query, {
          provider: $provider, model: $model, apiKey: $apiKey
        }) YIELD embedding
        CALL db.index.vector.queryNodes('evidence_embedding_idx', $k, embedding)
          YIELD node, score
        RETURN node.url AS url, node.title AS title, node.source AS source, score
        """,
            query=query,
            provider=PROVIDER,
            model=MODEL,
            apiKey=OPENAI_API_KEY,
            k=k,
        )
        return [r.data() for r in rec]


