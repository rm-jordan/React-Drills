/**
 * Drill verification tests — intentionally FAIL until you fix each drill file.
 * Run: npm run test:drills
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Comment, Update } from "../types";
import { BrokenControlledInput } from "./BrokenControlledInput";
import { filterUpdatesBroken } from "./BrokenFilterMemo";
import { BrokenNestedFetch } from "./BrokenNestedFetch";
import { BrokenStateMutation } from "./BrokenStateMutation";
import { BrokenUseEffect } from "./BrokenUseEffect";

vi.mock("../api/client", () => ({
  fetchComments: vi.fn(),
}));

import { fetchComments } from "../api/client";

const mockFetchComments = vi.mocked(fetchComments);

const sampleUpdate = (id: string, title: string, createdAt: string): Update => ({
  id,
  userId: "u1",
  title,
  body: "body",
  status: "pending",
  blockers: "",
  createdAt,
});

const sampleComment = (id: string, updateId: string, text: string): Comment => ({
  id,
  updateId,
  userId: "u3",
  text,
  createdAt: "2026-06-10T10:00:00.000Z",
});

beforeEach(() => {
  mockFetchComments.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Drill 1 — BrokenControlledInput", () => {
  it("uses a fully controlled input (no defaultValue) and updates on type", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<BrokenControlledInput />);
    const input = screen.getByPlaceholderText("Title");

    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});

describe("Drill 2 — BrokenStateMutation", () => {
  it("re-renders when an item is added", () => {
    render(<BrokenStateMutation />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});

describe("Drill 3 — BrokenUseEffect", () => {
  it("refetches comments when updateId changes", async () => {
    mockFetchComments
      .mockResolvedValueOnce([sampleComment("c1", "upd-a", "Comment A")])
      .mockResolvedValueOnce([sampleComment("c2", "upd-b", "Comment B")]);

    const { rerender } = render(<BrokenUseEffect updateId="upd-a" />);
    await waitFor(() => {
      expect(screen.getByText("Comment A")).toBeInTheDocument();
    });

    rerender(<BrokenUseEffect updateId="upd-b" />);
    await waitFor(() => {
      expect(screen.getByText("Comment B")).toBeInTheDocument();
    });

    expect(mockFetchComments).toHaveBeenCalledWith("upd-b");
  });
});

describe("Drill 4 — BrokenFilterMemo", () => {
  it("does not mutate the source updates array", () => {
    const updates = [
      sampleUpdate("1", "Alpha", "2026-06-01T00:00:00.000Z"),
      sampleUpdate("2", "Beta", "2026-06-02T00:00:00.000Z"),
    ];
    const before = updates.map((u) => u.id);

    filterUpdatesBroken(updates, "a");

    expect(updates.map((u) => u.id)).toEqual(before);
  });
});

describe("Drill 5 — BrokenNestedFetch", () => {
  it("ignores stale responses after updateId changes", async () => {
    let resolveSlow: (value: Comment[]) => void;
    const slowPromise = new Promise<Comment[]>((resolve) => {
      resolveSlow = resolve;
    });

    mockFetchComments.mockImplementation((updateId: string) => {
      if (updateId === "upd-a") return slowPromise;
      return Promise.resolve([sampleComment("c2", "upd-b", "Comment B")]);
    });

    const { rerender } = render(<BrokenNestedFetch updateId="upd-a" />);
    rerender(<BrokenNestedFetch updateId="upd-b" />);

    await waitFor(() => {
      expect(screen.getByText("Comment B")).toBeInTheDocument();
    });

    resolveSlow!([sampleComment("c1", "upd-a", "Stale Comment A")]);

    await waitFor(() => {
      expect(screen.queryByText("Stale Comment A")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Comment B")).toBeInTheDocument();
  });
});
