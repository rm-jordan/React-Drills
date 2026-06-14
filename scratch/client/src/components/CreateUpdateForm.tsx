/**
 * INTERVIEW DRILL 8 — Create update (controlled form + POST + onCreated)
 * See INTERVIEW_DRILLS.md Exercise 8
 * Reference: ../../../client/src/components/CreateUpdateForm.tsx
 */

import type { Update } from "../types";

interface Props {
  onCreated: (update: Update) => void;
}

export function CreateUpdateForm(_props: Props) {
  return <p className="muted">TODO: CreateUpdateForm</p>;
}
