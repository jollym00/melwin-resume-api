# Melwin Jolly — Resume API

A serverless REST API built with Vercel that serves resume data from a JSON file hosted on GitHub. No database required — update your data by editing a JSON file and pushing to GitHub.

---

## Tech Stack

- **Runtime**: Vercel Serverless Functions
- **Data source**: GitHub raw JSON
- **Language**: JavaScript (ES Modules)
- **CORS**: Enabled on all endpoints

---

## Project Structure

```
melwin-resume-api/
├── api/
│   ├── profile.js       # Contact & title info
│   ├── experience.js    # Work history
│   ├── skills.js        # Technical skills by category
│   └── education.js     # Degrees & institutions
├── vercel.json          # Routing config
├── package.json
└── README.md
```

---

## Data Source

Resume data lives in a separate GitHub repo as a single JSON file:

```
https://raw.githubusercontent.com/melwinjolly/melwin-resume-data/main/melwin-data.json
```

To update your resume, edit `melwin-data.json` in that repo and push — the API serves the latest version automatically.

---

## API Endpoints

### `GET /api/profile`
Returns name, title, location, and contact links.

```json
{
  "name": "Melwin Jolly",
  "title": "Full-Stack & Analytics Engineer | Strategy, Risk & Transactions",
  "location": "Melbourne, VIC",
  "linkedin": "linkedin.com/in/melwinjolly",
  "github": "github.com/melwinjolly"
}
```

---

### `GET /api/experience`
Returns all work experience entries.

**Query parameters:**

| Param | Example | Description |
|---|---|---|
| `id` | `/api/experience?id=2` | Return a single role by ID |
| `company` | `/api/experience?company=Deloitte` | Filter by company name |

```json
[
  {
    "id": 1,
    "role": "Operational Technology Software Engineer",
    "company": "BlueScope Steel",
    "period": "Nov 2025 – Present",
    "highlights": ["..."]
  }
]
```

---

### `GET /api/skills`
Returns all technical skills grouped by category.

**Query parameters:**

| Param | Example | Description |
|---|---|---|
| `category` | `/api/skills?category=data_analytics` | Return one skill category |

**Available categories:**
- `languages_frameworks`
- `backend_apis`
- `data_analytics`
- `devops_cicd`
- `cms_platforms`
- `ai_tools`
- `process`

```json
{
  "data_analytics": ["SQL", "MariaDB", "MySQL", "Azure Data services", "..."]
}
```

---

### `GET /api/education`
Returns all education entries.

```json
[
  {
    "id": 1,
    "degree": "Master of Professional Engineering",
    "major": "Engineering Management",
    "institution": "Swinburne University",
    "completed": "Dec 2024"
  }
]
```

---

## Setup & Deployment

### 1. Set up your data repo

1. Create a GitHub repo (e.g. `melwin-resume-data`)
2. Add `melwin-data.json` to the root
3. Copy the raw URL and update it in each `api/*.js` file

### 2. Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B — GitHub integration**
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Vercel auto-detects the config — click Deploy

Every push to `main` triggers an automatic redeploy.

---

## Local Development

```bash
npm i -g vercel
vercel dev
```

API available at `http://localhost:3000/api/...`

---

## Example Usage

```js
// Fetch all experience
const res = await fetch("https://your-project.vercel.app/api/experience");
const data = await res.json();

// Fetch Deloitte role only
const res = await fetch("https://your-project.vercel.app/api/experience?company=Deloitte");
```

---

## Author

**Melwin Jolly** — [linkedin.com/in/melwinjolly](https://linkedin.com/in/melwinjolly) · [github.com/melwinjolly](https://github.com/melwinjolly)