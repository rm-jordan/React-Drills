// SOLVED — reset with: npm run drills:reset
// Pattern: controlled input = value + onChange only (no defaultValue)

import { useState } from "react";

export function BrokenControlledInput() {
  const [title, setTitle] = useState("");

  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
    />
  );
}
