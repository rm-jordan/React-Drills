/** SESSION 2 — TODO: map updates to UpdateCard, empty state */

import type { Update } from "../types";

interface Props {
  updates: Update[];
  userNames: Record<string, string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function UpdateList(_props: Props) {
  return <p className="muted">TODO: UpdateList</p>;
}
