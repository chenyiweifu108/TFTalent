import { useState } from "react";

type Recommendation = {
  rank: number;
  comp_id: string;
  tier: string;
  difficulty: string;
  final_units: string[];
};

function App() {
  const [board, setBoard] = useState("Jhin,Shen");
  const [level, setLevel] = useState(6);
  const [result, setResult] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://tftalent-3.onrender.com/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board: board.split(",").map((b) => b.trim()),
            level: Number(level),
          }),
        }
      );

      const data = await res.json();
      setResult(data.recommendations);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1f1f1f",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 48 }}> TFTalent Recommender</h1>

      {/* Input */}
      <div style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Board:</label>
          <input
            style={inputStyle}
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Level:</label>
          <input
            type="number"
            style={inputStyle}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
        </div>

        <button style={buttonStyle} onClick={fetchRecommendation}>
          {loading ? "Loading..." : "Recommend"}
        </button>
      </div>

      {/* Result */}
      <div style={{ marginTop: 40 }}>
        {result?.map((rec, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>
                #{idx + 1} {rec.comp_id}
              </h2>
              <span style={tierBadge}>{rec.tier}</span>
            </div>

            <p>
              <strong>Difficulty:</strong> {rec.difficulty}
            </p>

            <p>
              <strong>Units:</strong>
            </p>
            <div style={unitWrapper}>
              {rec.final_units.map((u) => (
                <span key={u} style={unitTag}>
                  {u}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const inputStyle: React.CSSProperties = {
  marginLeft: 10,
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #555",
  background: "#2a2a2a",
  color: "white",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
  fontSize: 16,
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  color: "#111",
  borderRadius: 12,
  padding: 20,
  marginBottom: 20,
};

const tierBadge: React.CSSProperties = {
  background: "#22c55e",
  color: "white",
  padding: "6px 12px",
  borderRadius: 8,
  fontWeight: "bold",
};

const unitWrapper: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const unitTag: React.CSSProperties = {
  background: "#f3f4f6",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 14,
};

export default App;
