# Step 6 — NotebookLM Ingestion Workflow

## Objective
Define a repeatable, low-friction analysis workflow using NotebookLM for weekly Life OS review.

---

## Section 1 — Notebook Setup

### Notebook Name
**Life OS — Weekly Review**

### Upload Order (Sequential)
1. **Raw weekly JSON files** (oldest → newest)
   - `life-os-raw-week-01.json`
   - `life-os-raw-week-02.json`
   - ... (up to current week)

2. **Weekly summary JSON files** (same order)
   - `life-os-week-01-summary.json`
   - `life-os-week-02-summary.json`
   - ... (up to current week)

### Why This Order?
- Raw files provide context and granularity
- Summaries provide pillar-level aggregation
- Sequential upload ensures chronological understanding
- NotebookLM learns trend patterns across weeks

---

## Section 2 — Review Cadence (LOCKED)

### Frequency
**Once per week**

### Timing
**Same day as weekly export** (e.g., every Sunday evening)

### Duration
**15–20 minutes per session**

### Why Weekly?
- Aligns with Life OS 28-week cycle
- Prevents data accumulation
- Enables consistent reflection rhythm
- Supports incremental insight discovery

---

## Section 3 — LOCKED NOTEBOOKLM PROMPT (VERBATIM)

Copy-paste this prompt exactly into NotebookLM for each weekly analysis session:

---

### **Prompt Text (Do Not Modify)**

```
You are analyzing my Life OS weekly execution data.

Context:
- Data consists of raw weekly logs and weekly summaries.
- Pillars are binary daily completions.
- MATADOR indicates energy governance, not performance.

Tasks:
1. Summarize consistency trends per pillar over the last 4–6 weeks.
2. Identify sustained drops or improvements.
3. Correlate MATADOR deficit vs maintenance weeks with Health and Mind.
4. Highlight pillar imbalance (overfocus or neglect).
5. Ask 3 precise questions I should answer before planning next week.

Constraints:
- Do not moralize.
- Do not gamify.
- Do not optimize prematurely.
- Base conclusions only on the data provided.
```

---

## Section 4 — What NotebookLM Is NOT For

### Explicitly Do NOT Use It For
- ☐ **Daily tracking** – Use the app's daily entry UI for that
- ☐ **Scoring or ratings** – Avoid quantifying "progress" beyond binary pillar data
- ☐ **Motivation or pep talks** – The system is data-driven, not inspirational
- ☐ **Plan rewriting** – Don't let AI redefine your weekly goals
- ☐ **Complex multivariate optimization** – MATADOR is simple energy management
- ☐ **Forecasting** – Only analyze historical patterns, not predict future
- ☐ **Comparison to others** – Data is personal; do not benchmark

### What It IS For
- ✓ Trend analysis across 4–6 week windows
- ✓ Identifying pillar correlation patterns
- ✓ Spotting energy imbalance signals
- ✓ Asking clarifying questions for reflection
- ✓ Validating intuitions against raw data

---

## Section 5 — Workflow Steps

### Step 1: Prepare Files
1. Export current week from Life OS app
2. Download `life-os-raw-week-XX.json` and `life-os-week-XX-summary.json`
3. Save both files to Google Drive → Life-OS/Exports/Weekly

### Step 2: Open NotebookLM
1. Go to [notebooklm.google.com](https://notebooklm.google.com)
2. Open or create notebook "Life OS — Weekly Review"
3. Verify previous week's data is already uploaded

### Step 3: Upload New Files
1. Click **Upload sources**
2. Add `life-os-raw-week-XX.json` (raw file first)
3. Add `life-os-week-XX-summary.json` (summary file second)
4. Wait for indexing to complete (usually 30–60 seconds)

### Step 4: Ask the Locked Prompt
1. Copy the LOCKED PROMPT verbatim from Section 3
2. Paste into NotebookLM message box
3. Press Enter
4. Wait for analysis (typically 2–3 minutes)

### Step 5: Review Output
1. Read NotebookLM's analysis
2. Note the 3 questions it suggests
3. Jot down brief answers in your weekly reflection
4. Do NOT modify your Life OS plan based solely on this analysis

### Step 6: Archive Notebook Content (Optional)
1. Copy the analysis text
2. Paste into weekly notes or Google Doc for reference
3. Notebook automatically saves all chat history

---

## Section 6 — Acceptance Criteria

- ☐ Notebook name is "Life OS — Weekly Review"
- ☐ Upload order is raw files first, then summaries
- ☐ Review happens weekly, same day as export
- ☐ Prompt is used verbatim (no modifications)
- ☐ No Drive API calls from the app
- ☐ No AI integration in the app itself
- ☐ NotebookLM is external tool only
- ☐ Workflow requires zero automation

---

## Section 7 — Notes on Constraints

### Why No App-Level AI?
- Keeps encryption scope uncompromised
- Avoids credential management in app
- Maintains offline-first architecture
- User controls AI toolchain independently

### Why NotebookLM Specifically?
- Low friction: upload JSONs, ask questions
- No authentication layer beyond Google account
- Respects file privacy (Google Drive-native)
- Excellent for multi-week trend analysis

### Why Weekly, Not Monthly?
- Monthly windows miss energy fluctuations
- Weekly aligns with MATADOR cycle
- Prevents analysis paralysis
- Supports incremental habit refinement

---

## Section 8 — Troubleshooting

### Issue: NotebookLM says "insufficient data"
**Solution:** Ensure you've uploaded at least 2 weeks of data before running analysis.

### Issue: I modified the prompt and got weird results
**Solution:** Use the LOCKED PROMPT verbatim. AI quality depends on precise instructions.

### Issue: NotebookLM seems to be gamifying my data
**Solution:** Review its output against the "Constraints" in the LOCKED PROMPT. If it violates them, try a different phrasing in Section 3.

### Issue: The upload took too long
**Solution:** Refresh the page and try again. Typically completes in 30–60 seconds per file.

---

## Final Note

This workflow is **process-based, not code-based**. The Life OS app generates the data. You manually upload to NotebookLM. You control the analysis. The app remains agnostic to AI tooling.
