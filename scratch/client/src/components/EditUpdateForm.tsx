/**
 * INTERVIEW DRILL 9 — Edit update (controlled form + PATCH + onUpdated)
 * See INTERVIEW_DRILLS.md Exercise 9
 * Reference: ../../../client/src/components/EditUpdateForm.tsx
 */

import type { Update } from "../types";

interface Props {
  update: Update;
  onUpdated: (update: Update) => void;
  onCancel: () => void;
}

export function EditUpdateForm(_props: Props) {
  return <p className="muted">TODO: EditUpdateForm</p>;
}
