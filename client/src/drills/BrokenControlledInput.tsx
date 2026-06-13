// TODO DRILL: React warns about switching between controlled/uncontrolled input.
// Fix: pick one pattern — fully controlled with value + onChange.

import { useState } from "react";

export function BrokenControlledInput() {
  const [title, setTitle] = useState("");

  return (
    <input
      // BUG: defaultValue + value together — use only value for controlled inputs
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
    />
  );
}
