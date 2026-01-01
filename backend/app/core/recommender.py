import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[3] / "backend" / "data" / "processed" / "comps.json"

#load comps.json
def load_comps():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

#define overlap
def overlap(a, b):
    return len(set(a).intersection(b))

#scoring
def score_of_comp(comp, board, level):

    scores = 0

    final_overlap = overlap(board, comp["final_units"]) * 3
    scores += final_overlap

    level_key = str(level)
    if level_key in comp:
        early_mid_overlap = overlap(board, comp[level_key]) * 1
        scores += early_mid_overlap

    return scores

def recommend(comps, board, level):
    best_score = -1
    best_comp = None

    for comp in comps:
        score = score_of_comp(comp, board, level)

        if score > best_score:
            best_score = score
            best_comp = comp

    return best_comp


def recommend_top_k(comps, board, level, k=3):
    res = []
    for comp in comps:
        score = score_of_comp(comp, board, level)
        res.append((score, comp))

    res = sorted(res, reverse=True, key=lambda x: x[0])[:k]
    return list(map(lambda x: x[1], res))


#API
def get_recommendation(board, level):
    """
    board: list[str]
    level: int

    return comp dict
    """
    comps = load_comps()
    best_comp = recommend(comps, board, level)

    return best_comp


def format_top_k_recommendations(top_k_comps, board, level):
    results = []

    for rank, comp in enumerate(top_k_comps, start=1):
        results.append({
            "rank": rank,
            "comp_id": comp.get("comp_id"),
            "tier": comp.get("tier"),
            "difficulty": comp.get("difficulty"),
            "final_units": comp.get("final_units")
        })

    return {
        "input": {
            "board": board,
            "level": level
        },
        "recommendations": results
    }

def get_top_k_recommendations(board, level, k=3):
    comps = load_comps()
    top_k_comps = recommend_top_k(comps, board, level, k=3)
    format_top_k_comps = format_top_k_recommendations(top_k_comps, board, level)

    return format_top_k_comps













