from backend.app.core.recommender import get_recommendation

board = ["Jhin", "Shen", "Xinzhao", "Tristana"]

level = "4"

comp = get_recommendation(board, level)
print(comp)