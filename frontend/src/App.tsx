import { useState } from "react";

/** Tier 颜色映射 */
const tierColor = (tier: string) => {
  switch (tier) {
    case "S":
      return "#22c55e";
    case "A":
      return "#3b82f6";
    case "B":
      return "#facc15";
    default:
      return "#9ca3af";
  }
};

function App() {
  const [board, setBoard] = useState("Jhin,Shen");
  const [level, setLevel] = useState(6);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://tftalent-3.onrender.com/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board: board.split(","),
            level: Number(level),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch recommendation");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 700,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🔥 TFT Composition Recommender</h1>

      {/* Input Area */}
      <div style={{ marginBottom: 16 }}>
        <label>Board:</label>
        <input
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          style={{ marginLeft: 10, padding: 6, width: 250 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Level:</label>
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          style={{ marginLeft: 10, padding: 6, width: 80 }}
        />
      </div>

      <button
        onClick={fetchRecommendation}
        style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          background: "#6366f1",
          color: "white",
          cursor: "pointer",
        }}
      >
        Recommend
      </button>

      {/* Loading */}
      {loading && <p style={{ marginTop: 20 }}>🔄 Calculating best comp...</p>}

      {/* Error */}
      {error && (
        <p style={{ marginTop: 20, color: "red" }}>{error}</p>
      )}

      {/* Result */}
      {result && result.recommendations && (
        <div style={{ marginTop: 30 }}>
          {result.recommendations.map((rec: any, idx: number) => (
            <div
              key={rec.comp_id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                background: "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  #{idx + 1} {rec.comp_id}
                </h3>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: tierColor(rec.tier),
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  {rec.tier}
                </span>
              </div>

              {/* Body */}
              <div style={{ marginTop: 10 }}>
                <p>
                  <strong>Final Level:</strong> {rec.final_level}
                </p>
                <p>
                  <strong>Difficulty:</strong> {rec.difficulty}
                </p>
                <p>
                  <strong>Units:</strong>{" "}
                  {rec.final_units.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
