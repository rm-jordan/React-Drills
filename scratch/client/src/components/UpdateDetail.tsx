/** SESSION 2–6 — TODO: read view, then edit/delete/comments/review */

import type { Update } from "../types";

interface Props {
  update: Update;
  authorName: string;
  userNames: Record<string, string>;
  onUpdated: (update: Update) => void;
  onDeleted: (id: string) => void;
  onStatsRefresh: () => void;
}

export function UpdateDetail(_props: Props) {
  return <p className="muted">TODO: UpdateDetail</p>;
}
