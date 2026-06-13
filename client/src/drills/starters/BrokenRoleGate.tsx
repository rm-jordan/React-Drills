// TODO DRILL: Employees can see the manager-only review button.
// Fix: gate rendering with role check (see UpdateDetail + currentUser).

import type { Role } from "../../types";

interface Props {
  role: Role;
  status: "pending" | "reviewed" | "blocked";
  onReview: () => void;
}

export function BrokenRoleGate({ role, status, onReview }: Props) {
  return (
    <div>
      <span data-testid="status">{status}</span>
      {/* BUG: no role check */}
      {status === "pending" && (
        <button type="button" onClick={onReview}>
          Mark as Reviewed
        </button>
      )}
    </div>
  );
}
