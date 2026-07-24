export const STATUS = {
  APPLIED: "applied",
  SCREENING: "screening",
  INTERVIEW: "interview",
  OFFER: "offer",
  REJECTED: "rejected",
  GHOSTED: "ghosted",
};

export const STATUS_LABELS = {
  [STATUS.APPLIED]: "Applied",
  [STATUS.SCREENING]: "Screening",
  [STATUS.INTERVIEW]: "Interview",
  [STATUS.OFFER]: "Offer",
  [STATUS.REJECTED]: "Rejected",
  [STATUS.GHOSTED]: "Ghosted",
};

export const STATUS_COLORS = {
  [STATUS.APPLIED]: "#6b7280",     // gray
  [STATUS.SCREENING]: "#3b82f6",   // blue
  [STATUS.INTERVIEW]: "#f59e0b",   // amber
  [STATUS.OFFER]: "#10b981",       // green
  [STATUS.REJECTED]: "#ef4444",    // red
  [STATUS.GHOSTED]: "#8b5cf6",     // purple
};