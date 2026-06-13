// SOLVED — reset with: npm run drills:reset
// Pattern: key={item.id} — stable identity when list reorders or deletes

import { useState } from "react";

interface Item {
  id: string;
  label: string;
}

function CheckRow({
  item,
  onDelete,
}: {
  item: Item;
  onDelete: () => void;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div data-testid={`row-${item.id}`}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {item.label}
      </label>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export function BrokenListKeys() {
  const [items, setItems] = useState<Item[]>([
    { id: "a", label: "First" },
    { id: "b", label: "Second" },
    { id: "c", label: "Third" },
  ]);

  function deleteAt(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      {items.map((item, index) => (
        <CheckRow
          key={item.id}
          item={item}
          onDelete={() => deleteAt(index)}
        />
      ))}
    </div>
  );
}
