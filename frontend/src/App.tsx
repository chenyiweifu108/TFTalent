import { useState } from "react";
import "./App.css";

/* ======================
   英雄数据
====================== */

const HERO_POOL = {
  1: [
    "Anivia", "Blitzcrank", "Briar", "Caitlyn", "Illaoi",
    "Jarvan IV", "Jhin", "Kog’Maw", "Lulu", "Qiyana",
    "Rumble", "Shen", "Sona", "Viego"
  ],
  2: [
    "Aphelios", "Ashe", "Bard", "Cho’Gath", "Ekko",
    "Graves", "Neeko", "Orianna", "Poppy",
    "Rek'Sai", "Sion", "Teemo", "Tristana", "Tryndamere",
    "Twisted Fate", "Vi", "Xin Zhao", "Yasuo", "Yorick"
  ],
  3: [
    "Ahri", "Darius", "Dr. Mundo", "Draven", "Gangplank",
    "Gwen", "Jinx", "Kennen", "Kobuko & Yuumi",
    "LeBlanc", "Leona", "Loris", "Malzahar", "Milio",
    "Nautilus", "Sejuani", "Vayne", "Zoe"
  ],
  4: [
    "Ambessa", "Bel’Veth", "Braum", "Diana", "Fizz",
    "Garen", "Kai’Sa", "Kalista", "Lissandra", "Lux",
    "Miss Fortune", "Nasus", "Nidalee", "Renekton",
    "Rift Herald", "Seraphine", "Singed", "Skarner",
    "Swain", "Taric", "Veigar", "Warwick", "Wukong",
    "Yone", "Yunara"
  ],
  5: [
    "Aatrox", "Annie", "Aurelion Sol", "Azir",
    "Baron Nashor", "Brock", "Fiddlesticks",
    "Galio", "Kindred", "Lucian & Senna",
    "Mel", "Ornn", "Ryze", "Sett",
    "Shyvana", "Sylas", "Tahm Kench",
    "T-Hex", "Thresh", "Volibear",
    "Xerath", "Zaahen", "Ziggs", "Zilean"
  ]
};

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const toggleHero = (hero: string) => {
    setSelected((prev) =>
      prev.includes(hero)
        ? prev.filter((h) => h !== hero)
        : [...prev, hero]
    );
  };

  const fetchRecommendation = async () => {
    const res = await fetch(
      "https://tftalent-3.onrender.com/recommendations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          board: selected,
          level: selected.length
        }),
      }
    );

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 32, color: "#fff" }}>
      <h1>🔥 TFT Composition Recommender</h1>

      {/* 阵容区 */}
      <h2>📋 当前阵容</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {selected.map((h) => (
          <div
            key={h}
            onClick={() => toggleHero(h)}
            style={{
              padding: "6px 12px",
              border: "1px solid #888",
              borderRadius: 6,
              cursor: "pointer",
              background: "#333",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      <button
        onClick={fetchRecommendation}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Recommend
      </button>

      {/* 英雄池 */}
      <h2 style={{ marginTop: 40 }}>🧩 Hero Pool</h2>

      {Object.entries(HERO_POOL).map(([cost, heroes]) => (
        <div key={cost} style={{ marginBottom: 24 }}>
          <h3>{cost} Cost</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {heroes.map((hero) => (
              <div
                key={hero}
                onClick={() => toggleHero(hero)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: selected.includes(hero)
                    ? "#4ade80"
                    : "#222",
                  color: selected.includes(hero)
                    ? "#000"
                    : "#fff",
                }}
              >
                {hero}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 结果 */}
      {result && (
        <>
          <h2>📊 Recommendation</h2>
          <pre
            style={{
              background: "#111",
              padding: 16,
              borderRadius: 8,
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
