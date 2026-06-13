// TODO DRILL: Rapidly switching updates shows stale comments (race condition).
// Fix: cleanup flag in useEffect, ignore results when updateId has changed.

import { useEffect, useState } from "react";
import { fetchComments } from "../api/client";
import type { Comment } from "../types";

interface Props {
  updateId: string;
}

export function BrokenNestedFetch({ updateId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // BUG: no cancellation — slow response for update A can overwrite update B
    async function load() {
      const data = await fetchComments(updateId);
      setComments(data);
    }
    load();
  }, [updateId]);

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}
