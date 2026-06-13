// SOLVED — reset with: npm run drills:reset
// Pattern: role === "manager" && ... before manager-only actions

import type { Role } from "../types";

interface Props {
  role: Role;
  status: "pending" | "reviewed" | "blocked";
  onReview: () => void;
}

export function BrokenRoleGate({ role, status, onReview }: Props) {
  return (
    <div>
      <span data-testid="status">{status}</span>
      {role === "manager" && status === "pending" && (
        <button type="button" onClick={onReview}>
          Mark as Reviewed
        </button>
      )}
    </div>
  );
}
