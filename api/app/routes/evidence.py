from fastapi import APIRouter
from ..models import EvidenceIn
from ..graph import upsert_evidence


router = APIRouter(prefix="/evidences", tags=["evidence"])


@router.post("")
def add_evidence(ev: EvidenceIn):
    eid = upsert_evidence(ev)
    return {"id": eid}


