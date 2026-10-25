import type { ProjectWithTasks } from "@/types/project";
import { findTaskColumn } from "./drag-preview/find-task-column";

// True when a move takes a task out of an open column into a final one, the
// moment worth celebrating. Reordering inside a final column is not.
export function isCompletionMove(
  before: ProjectWithTasks,
  after: ProjectWithTasks,
  taskId: string,
) {
  const from = findTaskColumn(before, taskId);
  const to = findTaskColumn(after, taskId);
  return Boolean(from && to && !from.isFinal && to.isFinal);
}
