from fastapi import FastAPI
from .graph import ensure_indexes
from .routes import evidence, link, search


app = FastAPI(title="Second Brain API")
app.include_router(evidence.router)
app.include_router(link.router)
app.include_router(search.router)


@app.on_event("startup")
def startup():
    ensure_indexes()


@app.get("/healthz")
def health():
    return {"ok": True}


