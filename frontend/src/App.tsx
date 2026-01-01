import { useState } from "react";
import { CHAMPIONS, type Champion } from "./data/champions";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState<Champion[]>([]);

  /** 点击英雄 → 加入阵容 */
  const addChampion = (champion: Champion) => {
    if (selected.find(c => c.name === champion.name)) return;
    if (selected.length >= 9) return;

    setSelected([...selected, champion]);
  };

  /** 点击阵容里的英雄 → 移除 */
  const removeChampion = (name: string) => {
    setSelected(selected.filter(c => c.name !== name));
  };

  /** 按费用分组 */
  const grouped = CHAMPIONS.reduce<Record<number, Champion[]>>((acc, cur) => {
    acc[cur.cost] = acc[cur.cost] || [];
    acc[cur.cost].push(cur);
    return acc;
  }, {});

  return (
    <div style={{ padding: 24 }}>
      <h1>🔥 TFT Composition Recommender</h1>

      {/* ===== 已选阵容 ===== */}
      <h2>当前阵容（点击移除）</h2>
      <div style={boardStyle}>
        {selected.map(champ => (
          <div
            key={champ.name}
            style={championCard}
            onClick={() => removeChampion(champ.name)}
          >
            <img src={champ.img} alt={champ.name} />
            <span>{champ.name}</span>
          </div>
        ))}
        {selected.length === 0 && (
          <p style={{ color: "#888" }}>点击下方英雄添加</p>
        )}
      </div>

      {/* ===== 英雄池 ===== */}
      {Object.entries(grouped).map(([cost, champs]) => (
        <div key={cost}>
          <h2>{cost} 费英雄</h2>
          <div style={poolStyle}>
            {champs.map(champ => (
              <div
                key={champ.name}
                style={championCard}
                onClick={() => addChampion(champ)}
              >
                <img src={champ.img} alt={champ.name} />
                <span>{champ.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===== 样式 ===== */

const poolStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 32
};

const boardStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
  minHeight: 120,
  border: "1px dashed #555",
  padding: 12,
};

const championCard: React.CSSProperties = {
  width: 80,
  cursor: "pointer",
  textAlign: "center",
};

