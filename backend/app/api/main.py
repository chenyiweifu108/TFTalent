from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from backend.app.core.recommender import get_top_k_recommendations

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendRequest(BaseModel):
    board: List[str]
    level: int

class RecommendResponse(BaseModel):
    input: dict
    recommendations: list

@app.post("/recommendations", response_model=RecommendResponse)
def recommendations(req: RecommendRequest):
    return get_top_k_recommendations(
        board=req.board,
        level=req.level
    )
