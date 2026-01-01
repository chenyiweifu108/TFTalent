import { useState } from "react";
import { CHAMPIONS, type Champion } from "./data/champions";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState<Champion[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  /* 添加英雄 */
  const addChampion = (c: Champion) => {
    if (board.find(b => b.name === c.name)) return;
    if (board.length >= 9) return;
    setBoard([...board, c]);
  };

  /* 移除英雄 */
  const removeChampion = (name: string) => {
    setBoard(board.filter(c => c.name !== name));
  };

  /* 请求后端推荐 */
  const fetchRecommendation = async () => {
    const res = await fetch(
      "https://tftalent-3.onrender.com/recommendations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          board: board.map(b => b.name),
          level: board.length,
        }),
      }
    );

    const data = await res.json();
    setRecommendations(data.recommendations || []);
  };

  return (
    <div className="app">

      {/* ===== 当前阵容 ===== */}
      <h1>🔥 TFT Composition Builder</h1>

      <div className="board">
        {board.map(champ => (
          <div
            key={champ.name}
            className="champion"
            onClick={() => removeChampion(champ.name)}
          >
            <img src={champ.img} />
            <span>{champ.name}</span>
          </div>
        ))}
        {board.length === 0 && <p>点击下方英雄添加</p>}
      </div>

      <button onClick={fetchRecommendation}>
        获取推荐阵容
      </button>

      <div className="main">

        {/* ===== 英雄池 ===== */}
        <div className="pool">
          <h2>英雄池</h2>
          {Object.entries(
            CHAMPIONS.reduce<Record<number, Champion[]>>((acc, c) => {
              acc[c.cost] ??= [];
              acc[c.cost].push(c);
              return acc;
            }, {})
          ).map(([cost, champs]) => (
            <div key={cost}>
              <h3>{cost} 费</h3>
              <div className="grid">
                {champs.map(c => (
                  <div
                    key={c.name}
                    className="champion"
                    onClick={() => addChampion(c)}
                  >
                    <img src={c.img} />
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ===== 推荐阵容 ===== */}
        <div className="recommend">
          <h2>推荐阵容</h2>
          {recommendations.map((rec, idx) => (
            <div key={idx} className="recommend-card">
              <h4>Rank #{rec.rank}</h4>
              <div className="grid">
                {rec.final_units.map((name: string) => {
                  const champ = CHAMPIONS.find(c => c.name === name);
                  return champ ? (
                    <div key={name} className="champion">
                      <img src={champ.img} />
                      <span>{name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
