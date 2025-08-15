// Evidence 텍스트 임베딩 컬럼에 벡터 인덱스 생성
CREATE VECTOR INDEX evidence_embedding_idx IF NOT EXISTS
FOR (e:Evidence) ON (e.embedding)
OPTIONS {
  indexConfig: {
    "vector.dimensions": 1536,
    "vector.similarity_function": "cosine"
  }
};

// 검색 보조 인덱스
CREATE INDEX evidence_published_at IF NOT EXISTS
FOR (e:Evidence) ON (e.published_at);

CREATE INDEX rel_timestamp IF NOT EXISTS
FOR ()-[r]-() ON (r.timestamp, r.weight);


