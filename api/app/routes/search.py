from fastapi import APIRouter
from ..models import SearchQuery
from ..graph import vector_search


router = APIRouter(prefix="/search", tags=["search"])


@router.post("/vector")
def search_vector(body: SearchQuery):
    return {"results": vector_search(body.query, body.k)}


