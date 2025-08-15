from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Literal


class EvidenceIn(BaseModel):
    url: HttpUrl
    title: str
    source: str
    published_at: datetime
    text: str
    visibility: Literal["public", "team", "confidential"] = "team"


class LinkIn(BaseModel):
    src_id: str
    dst_id: str
    rel: Literal[
        "SUPPORTS",
        "CONTRADICTS",
        "DEPENDS_ON",
        "ALTERNATIVE_OF",
        "ADDRESSES",
        "VIOLATES",
    ]
    weight: float
    confidence: float
    timestamp: datetime


class SearchQuery(BaseModel):
    query: str
    k: int = 5


