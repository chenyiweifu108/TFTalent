export type Champion = {
  name: string;
  cost: number;
  img: string;
};

const CDN =
  "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion";

export const CHAMPIONS: Champion[] = [
  // ======================
  // ⭐ 1 COST
  // ======================
  { name: "Anivia", cost: 1, img: `${CDN}/Anivia.png` },
  { name: "Blitzcrank", cost: 1, img: `${CDN}/Blitzcrank.png` },
  { name: "Briar", cost: 1, img: `${CDN}/Briar.png` },
  { name: "Caitlyn", cost: 1, img: `${CDN}/Caitlyn.png` },
  { name: "Illaoi", cost: 1, img: `${CDN}/Illaoi.png` },
  { name: "Jarvan IV", cost: 1, img: `${CDN}/JarvanIV.png` },
  { name: "Jhin", cost: 1, img: `${CDN}/Jhin.png` },
  { name: "Kog'Maw", cost: 1, img: `${CDN}/KogMaw.png` },
  { name: "Lulu", cost: 1, img: `${CDN}/Lulu.png` },
  { name: "Qiyana", cost: 1, img: `${CDN}/Qiyana.png` },
  { name: "Rumble", cost: 1, img: `${CDN}/Rumble.png` },
  { name: "Shen", cost: 1, img: `${CDN}/Shen.png` },
  { name: "Sona", cost: 1, img: `${CDN}/Sona.png` },
  { name: "Viego", cost: 1, img: `${CDN}/Viego.png` },

  // ======================
  // ⭐⭐ 2 COST
  // ======================
  { name: "Aphelios", cost: 2, img: `${CDN}/Aphelios.png` },
  { name: "Ashe", cost: 2, img: `${CDN}/Ashe.png` },
  { name: "Bard", cost: 2, img: `${CDN}/Bard.png` },
  { name: "Cho'Gath", cost: 2, img: `${CDN}/Chogath.png` },
  { name: "Ekko", cost: 2, img: `${CDN}/Ekko.png` },
  { name: "Graves", cost: 2, img: `${CDN}/Graves.png` },
  { name: "Neeko", cost: 2, img: `${CDN}/Neeko.png` },
  { name: "Orianna", cost: 2, img: `${CDN}/Orianna.png` },
  { name: "Poppy", cost: 2, img: `${CDN}/Poppy.png` },
  { name: "Rek'Sai", cost: 2, img: `${CDN}/RekSai.png` },
  { name: "Sion", cost: 2, img: `${CDN}/Sion.png` },
  { name: "Teemo", cost: 2, img: `${CDN}/Teemo.png` },
  { name: "Tristana", cost: 2, img: `${CDN}/Tristana.png` },
  { name: "Tryndamere", cost: 2, img: `${CDN}/Tryndamere.png` },
  { name: "Twisted Fate", cost: 2, img: `${CDN}/TwistedFate.png` },
  { name: "Vi", cost: 2, img: `${CDN}/Vi.png` },
  { name: "Xin Zhao", cost: 2, img: `${CDN}/XinZhao.png` },
  { name: "Yasuo", cost: 2, img: `${CDN}/Yasuo.png` },
  { name: "Yorick", cost: 2, img: `${CDN}/Yorick.png` },

  // ======================
  // ⭐⭐⭐ 3 COST
  // ======================
  { name: "Ahri", cost: 3, img: `${CDN}/Ahri.png` },
  { name: "Darius", cost: 3, img: `${CDN}/Darius.png` },
  { name: "Dr.Mundo", cost: 3, img: `${CDN}/DrMundo.png` },
  { name: "Draven", cost: 3, img: `${CDN}/Draven.png` },
  { name: "Gangplank", cost: 3, img: `${CDN}/Gangplank.png` },
  { name: "Gwen", cost: 3, img: `${CDN}/Gwen.png` },
  { name: "Jinx", cost: 3, img: `${CDN}/Jinx.png` },
  { name: "Kennen", cost: 3, img: `${CDN}/Kennen.png` },
  { name: "Kobuko&Yummi", cost: 3, img: `${CDN}/Kobuko.png`},
  { name: "LeBlanc", cost: 3, img: `${CDN}/Leblanc.png` },
  { name: "Leona", cost: 3, img: `${CDN}/Leona.png` },
  { name: "Loris", cost: 3, img: `${CDN}/Loris.png`},
  { name: "Malzahar", cost: 3, img: `${CDN}/Malzahar.png` },
  { name: "Milio", cost: 3, img: `${CDN}/Milio.png` },
  { name: "Nautilus", cost: 3, img: `${CDN}/Nautilus.png` },
  { name: "Sejuani", cost: 3, img: `${CDN}/Sejuani.png` },
  { name: "Vayne", cost: 3, img: `${CDN}/Vayne.png` },
  { name: "Zoe", cost: 3, img: `${CDN}/Zoe.png` },

  // ======================
  // ⭐⭐⭐⭐ 4 COST
  // ======================
  { name: "Ambessa", cost: 4, img: `${CDN}/Ambessa.png` },
  { name: "Bel'Veth", cost: 4, img: `${CDN}/Belveth.png` },
  { name: "Braum", cost: 4, img: `${CDN}/Braum.png` },
  { name: "Diana", cost: 4, img: `${CDN}/Diana.png` },
  { name: "Fizz", cost: 4, img: `${CDN}/Fizz.png` },
  { name: "Garen", cost: 4, img: `${CDN}/Garen.png` },
  { name: "Kai'Sa", cost: 4, img: `${CDN}/Kaisa.png` },
  { name: "Kalista", cost: 4, img: `${CDN}/Kalista.png` },
  { name: "Lissandra", cost: 4, img: `${CDN}/Lissandra.png` },
  { name: "Lux", cost: 4, img: `${CDN}/Lux.png` },
  { name: "Miss Fortune", cost: 4, img: `${CDN}/MissFortune.png` },
  { name: "Nasus", cost: 4, img: `${CDN}/Nasus.png` },
  { name: "Nidalee", cost: 4, img: `${CDN}/Nidalee.png`},
  { name: "Renekton", cost: 4, img: `${CDN}/Renekton.png` },
  { name: "RiftHerald", cost: 4, img: `${CDN}/RiftHerald.png`},
  { name: "Seraphine", cost: 4, img: `${CDN}/Seraphine.png` },
  { name: "Singed", cost: 4, img: `${CDN}/Singed.png` },
  { name: "Skarner", cost: 4, img: `${CDN}/Skarner.png` },
  { name: "Swain", cost: 4, img: `${CDN}/Swain.png` },
  { name: "Taric", cost: 4, img: `${CDN}/Taric.png` },
  { name: "Veigar", cost: 4, img: `${CDN}/Veigar.png` },
  { name: "Warwick", cost: 4, img: `${CDN}/Warwick.png` },
  { name: "Wukong", cost: 4, img: `${CDN}/MonkeyKing.png` },
  { name: "Yone", cost: 4, img: `${CDN}/Yone.png` },
  { name: "Yunara", cost: 4, img: `${CDN}/Yunara.png` },

  // ======================
  // ⭐⭐⭐⭐⭐ 5 COST
  // ======================
  { name: "Aatrox", cost: 5, img: `${CDN}/Aatrox.png` },
  { name: "Annie", cost: 5, img: `${CDN}/Annie.png` },
  { name: "Aurelion Sol", cost: 7, img: `${CDN}/AurelionSol.png` },
  { name: "Azir", cost: 5, img: `${CDN}/Azir.png` },
  { name: "Baron Nashor", cost: 7, img: `${CDN}/BaronNashor.png`},
  { name: "Brock", cost: 7, img: `${CDN}/Brock.png`},
  { name: "Fiddlesticks", cost: 5, img: `${CDN}/Fiddlesticks.png` },
  { name: "Galio", cost: 5, img: `${CDN}/Galio.png` },
  { name: "Kindred", cost: 5, img: `${CDN}/Kindred.png` },
  { name: "Lucian&Senna", cost: 5, img: `${CDN}/Lucian.png` },
  { name: "Mel", cost: 5, img: `${CDN}/Mel.png`},
  { name: "Ornn", cost: 5, img: `${CDN}/Ornn.png` },
  { name: "Ryze", cost: 7, img: `${CDN}/Ryze.png` },
  { name: "Sett", cost: 5, img: `${CDN}/Sett.png` },
  { name: "Shyvana", cost: 5, img: `${CDN}/Shyvana.png` },
  { name: "Sylas", cost: 7, img: `${CDN}/Sylas.png` },
  { name: "Tahm Kench", cost: 5, img: `${CDN}/TahmKench.png` },
  { name: "T-Hex", cost: 5, img: `${CDN}/T-Hex.png` },
  { name: "Thresh", cost: 5, img: `${CDN}/Thresh.png` },
  { name: "Volibear", cost: 5, img: `${CDN}/Volibear.png` },
  { name: "Xerath", cost: 5, img: `${CDN}/Xerath.png` },
  { name: "Zaahen", cost: 7, img: `${CDN}/Zaahen.png` },
  { name: "Ziggs", cost: 5, img: `${CDN}/Ziggs.png` },
  { name: "Zilean", cost: 5, img: `${CDN}/Zilean.png` },
  {name: "Tibbers", cost: 5, img: `${CDN}/Tibbers.png`}
];
