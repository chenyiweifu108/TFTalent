export async function getRecommendations(board: string[], level: number) {
  const res = await fetch("http://127.0.0.1:8000/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      board,
      level
    })
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
