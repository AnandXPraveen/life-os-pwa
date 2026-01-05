// /src/checklists.js
// Locked checklist definitions - no storage, no user edits

export const CHECKLISTS = {
  Health: [
    { id: "strength", label: "Strength training / sport" },
    { id: "conditioning", label: "Conditioning / steps" },
    { id: "sleep", label: "Sleep ≥ target" },
    { id: "mobility", label: "Mobility / rehab" },
    { id: "nutrition", label: "Nutrition on plan" }
  ],
  Career: [
    { id: "primary", label: "Primary work block" },
    { id: "deep", label: "Deep work / deliverable" }
  ],
  Mind: [
    { id: "study", label: "Study (CPIM / core)" },
    { id: "language", label: "Language practice" },
    { id: "reading", label: "Reading / reflection" }
  ],
  Relationships: [
    { id: "touchpoint", label: "Meaningful touchpoint" }
  ],
  Finance: [
    { id: "review", label: "Expense / money review" }
  ],
  Environment: [
    { id: "physical", label: "Physical space reset" },
    { id: "digital", label: "Digital hygiene" }
  ]
};
