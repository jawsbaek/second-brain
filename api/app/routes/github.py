from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl
from datetime import datetime
import requests
import base64
import os
from ..models import EvidenceIn
from ..graph import upsert_evidence

router = APIRouter(prefix="/github", tags=["github"])

class RepoIn(BaseModel):
    url: HttpUrl


def _parse_repo(url: str) -> tuple[str, str]:
    parts = url.rstrip('/').split('/')
    if len(parts) < 2:
        raise ValueError("Invalid repository URL")
    return parts[-2], parts[-1]


@router.post("/repo")
def ingest_repo(repo: RepoIn):
    owner, name = _parse_repo(str(repo.url))
    headers = {}
    token = os.getenv("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"
    repo_api = f"https://api.github.com/repos/{owner}/{name}"
    info = requests.get(repo_api, headers=headers).json()
    readme_resp = requests.get(f"{repo_api}/readme", headers=headers)
    if readme_resp.status_code == 200:
        content = readme_resp.json().get("content", "")
        text = base64.b64decode(content).decode("utf-8")
    else:
        text = ""
    ev = EvidenceIn(
        url=repo.url,
        title=info.get("full_name", f"{owner}/{name}"),
        source="github",
        published_at=datetime.fromisoformat(
            info.get("created_at", datetime.utcnow().isoformat() + "Z").replace("Z", "+00:00")
        ),
        text=text,
    )
    eid = upsert_evidence(ev)
    return {"id": eid}
