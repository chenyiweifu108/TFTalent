from fastapi import FastAPI
from pydantic import BaseModel
from backend.app.core.recommender import recommend_top_k, get_top_k_recommendations

app = FastAPI()


# -----------------------------
# Request Model
# -----------------------------
class RecommendRequest(BaseModel):
    board: list[str]
    level: int


# -----------------------------
# Response Model（可选但推荐）
# -----------------------------
class RecommendResponse(BaseModel):
    recommendations: list


# -----------------------------
# API Endpoint
# -----------------------------
@app.post("/recommendations", response_model=RecommendResponse)
def recommendations(req: RecommendRequest):
    result = get_top_k_recommendations(
        board=req.board,
        level=req.level
    )

    return {
        "recommendations": result
    }
