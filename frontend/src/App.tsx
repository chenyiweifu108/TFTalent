import { useState } from "react";

/* ===== 英雄池（后续可接真实数据） ===== */
const ALL_UNITS = [
  "Jhin",
  "Shen",
  "Yasuo",
  "Ahri",
  "Sett",
  "Wukong",
  "Lucian",
  "Taric",
  "Fiddlesticks",
  "Kindred",
];

/* ===== 数据类型 ===== */
type Recommendation = {
  rank: number;
  comp_id: string;
  tier: string;
  difficulty: string;
  final_units: string[];
};

function App() {
  const [board, setBoard] = useState<string[]>([]);
  const [level, setLevel] = useState(6);
  const [result, setResult] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  /* ===== 点击英雄：加入 / 移除 ===== */
  const toggleUnit = (unit: string) => {
    setBoard((prev) =>
      prev.includes(unit)
        ? prev.filter((u) => u !== unit)
        : [...prev, unit]
    );
  };

  /* ===== 请求后端 ===== */
  const fetchRecommendation = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://tftalent-3.onrender.com/recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: board,
            level: level,
          }),
        }
      );

      const data = await res.json();
      setResult(data.recommendations);
    } catch (err) {
      alert("Failed to fetch recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <h1>🔥 TFT Composition Recommender</h1>

      {/* ===== 英雄选择区 ===== */}
      <h3>Select Your Board</h3>
      <div style={unitGrid}>
        {ALL_UNITS.map((unit) => (
          <button
            key={unit}
            onClick={() => toggleUnit(unit)}
            style={{
              ...unitButton,
              background: board.includes(unit)
                ? "#dcfce7"
                : "#f9f9f9",
              border: board.includes(unit)
                ? "2px solid #22c55e"
                : "1px solid #ccc",
            }}
          >
            {unit}
          </button>
        ))}
      </div>

      {/* ===== Level ===== */}
      <div style={{ marginTop: 20 }}>
        <label>Level:</label>
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      {/* ===== Button ===== */}
      <button style={buttonStyle} onClick={fetchRecommendation}>
        {loading ? "Calculating..." : "Recommend"}
      </button>

      {/* ===== 推荐结果 ===== */}
      {result && (
        <div style={{ marginTop: 40 }}>
          {result.map((rec, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={cardHeader}>
                <h2>
                  #{idx + 1} {rec.comp_id}
                </h2>
                <span style={tierBadge}>{rec.tier}</span>
              </div>

              <p><strong>Difficulty:</strong> {rec.difficulty}</p>

              <p><strong>Units:</strong></p>
              <div style={unitList}>
                {rec.final_units.map((u) => (
                  <span key={u} style={unitTag}>
                    {u}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Styles ===== */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#1f1f1f",
  color: "white",
  padding: "40px",
  fontFamily: "Arial, sans-serif",
};

const unitGrid: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const unitButton: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
};

const inputStyle: React.CSSProperties = {
  marginLeft: 10,
  padding: "6px",
  borderRadius: 6,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 20,
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
  fontSize: 16,
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  color: "#000",
  borderRadius: 12,
  padding: 20,
  marginBottom: 20,
};

const cardHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tierBadge: React.CSSProperties = {
  background: "#22c55e",
  color: "white",
  padding: "4px 10px",
  borderRadius: 6,
  fontWeight: "bold",
};

const unitList: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const unitTag: React.CSSProperties = {
  background: "#f3f4f6",
  padding: "6px 10px",
  borderRadius: 6,
};

export default App;
