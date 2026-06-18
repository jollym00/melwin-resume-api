const GITHUB_JSON_URL =
  "https://raw.githubusercontent.com/melwinjolly/my-api-data/main/melwin-data.json";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  try {
    const response = await fetch(GITHUB_JSON_URL);
    if (!response.ok) throw new Error("Failed to fetch data from GitHub");
    const data = await response.json();

    const { id, company } = req.query;

    // Filter by id → /api/experience?id=1
    if (id) {
      const item = data.experience.find((e) => e.id === parseInt(id));
      if (!item) return res.status(404).json({ error: "Experience not found" });
      return res.status(200).json(item);
    }

    // Filter by company → /api/experience?company=Deloitte
    if (company) {
      const results = data.experience.filter((e) =>
        e.company.toLowerCase().includes(company.toLowerCase())
      );
      return res.status(200).json(results);
    }

    // Return all
    res.status(200).json(data.experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
