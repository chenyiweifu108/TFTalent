import { useState } from "react";

function App() {
  const [board, setBoard] = useState("Jhin,Shen");
  const [level, setLevel] = useState(6);
  const [result, setResult] = useState<any>(null);

  const fetchRecommendation = async () => {
    const res = await fetch("https://tftalent-3.onrender.com/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: board.split(","),
        level: Number(level),
      }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>TFT Recommendation</h1>

      <div>
        <label>Board:</label>
        <input
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        />
      </div>

      <div>
        <label>Level:</label>
        <input
          type="number"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </div>

      <button onClick={fetchRecommendation}>Recommend</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default App;
