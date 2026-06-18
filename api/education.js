const GITHUB_JSON_URL =
  "https://raw.githubusercontent.com/melwinjolly/my-api-data/main/melwin-data.json";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  try {
    const response = await fetch(GITHUB_JSON_URL);
    if (!response.ok) throw new Error("Failed to fetch data from GitHub");
    const data = await response.json();
    res.status(200).json(data.education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
