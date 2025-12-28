from backend.app.core.recommender import get_recommendation, get_top_k_recommendations

board = ["Jhin", "Shen", "Xinzhao", "Tristana"]

level = "4"

comp = get_recommendation(board, level)
print(comp)

comp_top_k = get_top_k_recommendations(board, level, k=3)
print(comp_top_k)


