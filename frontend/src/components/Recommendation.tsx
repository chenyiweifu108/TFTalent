import { useState } from "react";
import { getRecommendations } from "../services/api";

export default function Recommend() {
  const [board, setBoard] = useState("Jhin,Shen,XinZhao,Tristana");
  const [level, setLevel] = useState(4);
  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {
    const data = await getRecommendations(
      board.split(","),
      level
    );
    setResult(data);
  };

  return (
    <div>
      <h2>TFT Recommendation</h2>

      <input
        value={board}
        onChange={(e) => setBoard(e.target.value)}
      />

      <input
        type="number"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
      />

      <button onClick={handleClick}>Recommend</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
