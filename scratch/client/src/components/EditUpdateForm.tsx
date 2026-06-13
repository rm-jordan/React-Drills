/** SESSION 4 — TODO: controlled edit form, patchUpdate, onUpdated */

import type { Update } from "../types";

interface Props {
  update: Update;
  onUpdated: (update: Update) => void;
  onCancel: () => void;
}

export function EditUpdateForm(_props: Props) {
  return <p className="muted">TODO: EditUpdateForm</p>;
}
