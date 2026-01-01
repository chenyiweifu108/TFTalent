import { useState } from "react";
import { CHAMPIONS } from "./data/champions";
import type { Champion } from "./data/champions";
import "./App.css";


type Recommendation = {
  rank: number;
  comp_id: string;
  tier: string;
  difficulty: string;
  final_units: string[];
};

export default function App() {
  const [board, setBoard] = useState<Champion[]>([]);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  // name -> champion 映射（关键）
  const champMap = Object.fromEntries(
    CHAMPIONS.map(c => [c.name, c])
  );

  const addChampion = (c: Champion) => {
    if (!board.find(b => b.name === c.name)) {
      setBoard([...board, c]);
    }
  };

  const removeChampion = (name: string) => {
    setBoard(board.filter(c => c.name !== name));
  };

  const getRecommendation = async () => {
    const res = await fetch("https://tftalent-3.onrender.com/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        board: board.map(b => b.name),
        level: board.length
      })
    });

    const data = await res.json();
    setRecs(data.recommendations);
  };

  const grouped = CHAMPIONS.reduce((acc, c) => {
    acc[c.cost] ||= [];
    acc[c.cost].push(c);
    return acc;
  }, {} as Record<number, Champion[]>);

  return (
    <div className="app">
      <h1>🔥 TFT Composition Builder</h1>

      <button className="recommend-btn" onClick={getRecommendation}>
        获取推荐阵容
      </button>

      <div className="main-layout">

        {/* 当前阵容 */}
        <div className="panel">
          <h2>当前阵容</h2>
          <div className="grid">
            {board.map(c => (
              <div
                key={c.name}
                className="champion"
                onClick={() => removeChampion(c.name)}
              >
                <img src={c.img} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 推荐阵容 */}
        <div className="panel">
          <h2>推荐阵容</h2>

          {recs.map((rec) => (
            <div key={rec.rank} className="rec-card">
              <div className="rec-header">
                <h3>{rec.comp_id}</h3>
                <span className="tier">{rec.tier}</span>
                <span className="meta">{rec.difficulty}</span>
              </div>

              <div className="grid">
                {rec.final_units.map(name => {
                  const champ = champMap[name];
                  if (!champ) return null;

                  return (
                    <div key={name} className="champion">
                      <img src={champ.img} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 英雄池 */}
        <div className="panel pool">
          <h2>英雄池</h2>
          {Object.entries(grouped).map(([cost, champs]) => (
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

      </div>
    </div>
  );
}
