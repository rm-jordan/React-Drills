/**
 * Drill verification tests — intentionally FAIL until you fix each drill file.
 * Run: npm run test:drills
 */
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Comment, Update } from "../types";
import { BrokenControlledInput } from "./BrokenControlledInput";
import { filterUpdatesBroken } from "./BrokenFilterMemo";
import { BrokenLiftSelection } from "./BrokenLiftSelection";
import { BrokenListKeys } from "./BrokenListKeys";
import { BrokenMapRender } from "./BrokenMapRender";
import { BrokenNestedFetch } from "./BrokenNestedFetch";
import { BrokenParentSync } from "./BrokenParentSync";
import { BrokenRenderStates } from "./BrokenRenderStates";
import { BrokenRoleGate } from "./BrokenRoleGate";
import { BrokenStateMutation } from "./BrokenStateMutation";
import { BrokenUpdateInList } from "./BrokenUpdateInList";
import { BrokenUseEffect } from "./BrokenUseEffect";

vi.mock("../api/client", () => ({
  fetchComments: vi.fn(),
  patchUpdate: vi.fn(),
}));

import { fetchComments, patchUpdate } from "../api/client";

const mockFetchComments = vi.mocked(fetchComments);
const mockPatchUpdate = vi.mocked(patchUpdate);

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
  mockPatchUpdate.mockReset();
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
    expect(screen.getAllByText("Comment B")).toHaveLength(1);
  });
});

describe("Drill 6 — BrokenMapRender", () => {
  it("renders list items from an array using .map()", () => {
    render(<BrokenMapRender />);
    expect(screen.getByText("Alpha update")).toBeInTheDocument();
    expect(screen.getByText("Beta update")).toBeInTheDocument();
  });
});

describe("Drill 7 — BrokenListKeys", () => {
  it("keeps row state on the correct item after a delete", () => {
    render(<BrokenListKeys />);

    const thirdRow = screen.getByTestId("row-c");
    fireEvent.click(within(thirdRow).getByRole("checkbox"));
    expect(within(thirdRow).getByRole("checkbox")).toBeChecked();

    const firstRow = screen.getByTestId("row-a");
    fireEvent.click(within(firstRow).getByRole("button", { name: "Delete" }));

    const remainingThird = screen.getByText("Third").closest("[data-testid='row-c']");
    expect(remainingThird).not.toBeNull();
    expect(within(remainingThird!).getByRole("checkbox")).toBeChecked();
  });
});

describe("Drill 8 — BrokenUpdateInList", () => {
  it("updates status in the list after mark reviewed", () => {
    render(<BrokenUpdateInList />);

    fireEvent.click(screen.getByRole("button", { name: /mark reviewed/i }));
    expect(screen.getByTestId("status-upd1")).toHaveTextContent("reviewed");
  });
});

describe("Drill 9 — BrokenRenderStates", () => {
  it("shows only loading state while fetching", () => {
    render(<BrokenRenderStates updates={[]} loading={true} error={null} />);
    expect(screen.getByText("Loading updates…")).toBeInTheDocument();
    expect(screen.queryByTestId("update-list")).not.toBeInTheDocument();
  });

  it("shows empty message when there are no updates", () => {
    render(<BrokenRenderStates updates={[]} loading={false} error={null} />);
    expect(screen.getByText("No updates yet.")).toBeInTheDocument();
  });
});

describe("Drill 10 — BrokenParentSync", () => {
  it("notifies parent after a successful PATCH", async () => {
    const onUpdated = vi.fn();
    const update = sampleUpdate("upd1", "Test", "2026-06-10T09:00:00.000Z");
    mockPatchUpdate.mockResolvedValue({ ...update, status: "reviewed" });

    render(<BrokenParentSync update={update} onUpdated={onUpdated} />);
    fireEvent.click(screen.getByRole("button", { name: /mark reviewed/i }));

    await waitFor(() => {
      expect(onUpdated).toHaveBeenCalledWith(expect.objectContaining({ status: "reviewed" }));
    });
  });
});

describe("Drill 11 — BrokenRoleGate", () => {
  it("hides manager review action for employees", () => {
    render(<BrokenRoleGate role="employee" status="pending" onReview={() => {}} />);
    expect(screen.queryByRole("button", { name: /mark as reviewed/i })).not.toBeInTheDocument();
  });

  it("shows manager review action for managers", () => {
    render(<BrokenRoleGate role="manager" status="pending" onReview={() => {}} />);
    expect(screen.getByRole("button", { name: /mark as reviewed/i })).toBeInTheDocument();
  });
});

describe("Drill 12 — BrokenLiftSelection", () => {
  it("updates detail when a different list item is selected", () => {
    render(<BrokenLiftSelection />);
    expect(screen.getByTestId("detail")).toHaveTextContent("First update");

    fireEvent.click(screen.getByRole("button", { name: "Second update" }));
    expect(screen.getByTestId("detail")).toHaveTextContent("Second update");
  });
});
