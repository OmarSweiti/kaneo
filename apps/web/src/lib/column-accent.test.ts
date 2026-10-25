import { describe, expect, it } from "vite-plus/test";
import { getColumnAccent } from "./column-accent";

describe("getColumnAccent", () => {
  it("uses the status colour for built-in columns", () => {
    expect(getColumnAccent("to-do")).toBe("var(--column-todo)");
    expect(getColumnAccent("in-progress")).toBe("var(--column-progress)");
    expect(getColumnAccent("done", true)).toBe("var(--column-done)");
  });

  it("treats any custom final column as done", () => {
    expect(getColumnAccent("shipped", true)).toBe("var(--column-done)");
  });

  it("gives custom columns a stable palette colour", () => {
    const accent = getColumnAccent("qa-backlog");
    expect(accent).toMatch(/^var\(--aurora-/);
    expect(getColumnAccent("qa-backlog")).toBe(accent);
  });

  it("does not read inherited object keys as statuses", () => {
    expect(getColumnAccent("toString")).toMatch(/^var\(--aurora-/);
  });
});
