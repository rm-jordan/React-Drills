// SOLVED — reset with: npm run drills:reset
// Pattern: .map() returns JSX; .forEach() returns undefined

import type { Update } from "../types";

const ITEMS: Pick<Update, "id" | "title">[] = [
  { id: "1", title: "Alpha update" },
  { id: "2", title: "Beta update" },
];

export function BrokenMapRender() {
  return (
    <ul data-testid="update-list">
      {ITEMS.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
