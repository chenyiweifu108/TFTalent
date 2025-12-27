import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[3] / "data" / "processed" / "comps.json"

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










