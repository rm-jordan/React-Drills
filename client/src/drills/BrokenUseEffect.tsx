// TODO DRILL: This component fetches comments but has a broken useEffect.
// Symptoms: comments never reload when updateId changes, or you get a memory leak warning.
// Fix: correct dependency array + cleanup flag.

import { useEffect, useState } from "react";
import { fetchComments } from "../api/client";
import type { Comment } from "../types";

interface Props {
  updateId: string;
}

export function BrokenUseEffect({ updateId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments(updateId).then(setComments);
    // BUG: empty deps — only runs once on mount
  }, []);

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}
