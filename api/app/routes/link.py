from fastapi import APIRouter
from ..models import LinkIn
from ..graph import create_link


router = APIRouter(prefix="/links", tags=["link"])


@router.post("")
def add_link(l: LinkIn):
    create_link(l)
    return {"ok": True}


