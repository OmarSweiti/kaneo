import { describe, expect, it } from "vite-plus/test";
import type { ProjectWithTasks } from "@/types/project";
import { isCompletionMove } from "./is-completion-move";

function board(columns: Array<[string, boolean, string[]]>) {
  return {
    columns: columns.map(([id, isFinal, taskIds]) => ({
      id,
      isFinal,
      tasks: taskIds.map((taskId) => ({ id: taskId })),
    })),
  } as unknown as ProjectWithTasks;
}

describe("isCompletionMove", () => {
  it("is true when a task lands in a final column from an open one", () => {
    const before = board([
      ["in-progress", false, ["a"]],
      ["done", true, []],
    ]);
    const after = board([
      ["in-progress", false, []],
      ["done", true, ["a"]],
    ]);
    expect(isCompletionMove(before, after, "a")).toBe(true);
  });

  it("is false for moves between open columns", () => {
    const before = board([
      ["to-do", false, ["a"]],
      ["in-progress", false, []],
    ]);
    const after = board([
      ["to-do", false, []],
      ["in-progress", false, ["a"]],
    ]);
    expect(isCompletionMove(before, after, "a")).toBe(false);
  });

  it("is false when reordering inside a final column or reopening a task", () => {
    const done = board([
      ["to-do", false, []],
      ["done", true, ["a", "b"]],
    ]);
    const reopened = board([
      ["to-do", false, ["a"]],
      ["done", true, ["b"]],
    ]);
    expect(isCompletionMove(done, done, "a")).toBe(false);
    expect(isCompletionMove(done, reopened, "a")).toBe(false);
  });
});
