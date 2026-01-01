import { useState } from "react";
import { CHAMPIONS } from "./data/champions";
import "./App.css";

type Champion = {
  name: string;
  cost: number;
  img: string;
};

export default function App() {
  const [board, setBoard] = useState<Champion[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // 添加英雄
  const addChampion = (champ: Champion) => {
    if (board.find(c => c.name === champ.name)) return;
    if (board.length >= 9) return;
    setBoard([...board, champ]);
  };

  // 移除英雄
  const removeChampion = (name: string) => {
    setBoard(board.filter(c => c.name !== name));
  };

  // 请求推荐
  const getRecommendation = async () => {
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

  // 按费用分组
  const grouped = CHAMPIONS.reduce((acc, c) => {
    acc[c.cost] ||= [];
    acc[c.cost].push(c);
    return acc;
  }, {} as Record<number, Champion[]>);

  return (
    <div className="app">
      <h1 className="title">🔥 TFT Composition Builder</h1>

      <button className="recommend-btn" onClick={getRecommendation}>
        获取推荐阵容
      </button>

      {/* 上半部分 */}
      <div className="layout">
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
          {recommendations.map((rec, i) => (
            <div key={i} className="grid">
              {rec.final_units.map((name: string) => {
                const champ = CHAMPIONS.find(c => c.name === name);
                return (
                  champ && (
                    <div key={name} className="champion">
                      <img src={champ.img} />
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 英雄池 */}
      <div className="pool">
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
  );
}
