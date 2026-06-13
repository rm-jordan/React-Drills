/** SESSION 2 — TODO: clickable card, title, status badge, author */

import type { Update } from "../types";

interface Props {
  update: Update;
  authorName: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function UpdateCard(_props: Props) {
  return <div>TODO: UpdateCard</div>;
}
