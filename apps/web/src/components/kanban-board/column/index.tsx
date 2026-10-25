import { useDroppable } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
import { type CSSProperties, memo } from "react";
import { getColumnAccent } from "@/lib/column-accent";
import { useBackgroundStore } from "@/store/background";
import type { ProjectWithTasks } from "@/types/project";
import { ColumnDropzone } from "./column-dropzone";
import { ColumnHeader } from "./column-header";
import { ColumnSortHint } from "./column-sort-hint";

type ColumnProps = {
  column: ProjectWithTasks["columns"][number];
  activeTaskId: string | null;
  sortHint?: string;
  disableDragDrop?: boolean;
  disableSorting?: boolean;
  disableCollectionActions?: boolean;
};

export const columnVariants = cva(
  "group relative flex h-full min-h-0 w-full flex-col rounded-xl bg-linear-to-b from-[color-mix(in_oklab,var(--column-accent)_7%,transparent)] to-transparent to-40% transition-[background-color,box-shadow] duration-200",
  {
    defaultVariants: {
      isDropzoneOver: false,
      backgroundImage: false,
    },
    variants: {
      isDropzoneOver: {
        true: "",
        false: "",
      },
      backgroundImage: {
        true: "before:content-[''] before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDropzoneOver: false,
        backgroundImage: false,
        class: "bg-board-lane",
      },
      {
        isDropzoneOver: true,
        backgroundImage: false,
        class:
          "bg-board-lane ring-2 ring-(--column-accent)/45 shadow-[0_0_28px_-6px_var(--column-accent)]",
      },
      {
        isDropzoneOver: false,
        backgroundImage: true,
        class:
          "border border-border/70 bg-background shadow-md before:bg-muted before:dark:bg-card",
      },
      {
        isDropzoneOver: true,
        backgroundImage: true,
        class:
          "border border-border/70 bg-background ring-2 ring-focus/60 before:bg-accent/60",
      },
    ],
  },
);

function Column({
  column,
  activeTaskId,
  sortHint,
  disableDragDrop = false,
  disableSorting = false,
  disableCollectionActions = false,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", column },
  });
  const { background } = useBackgroundStore();

  return (
    <div
      ref={setNodeRef}
      data-slot="board-column"
      style={
        {
          "--column-accent": getColumnAccent(column.id, column.isFinal),
        } as CSSProperties
      }
      className={columnVariants({
        isDropzoneOver: isOver,
        backgroundImage: !!background,
      })}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-0.5 rounded-full bg-(--column-accent) opacity-80"
      />
      <div className="shrink-0 pt-1 pr-2 pl-3">
        <ColumnHeader
          column={column}
          disableCollectionActions={disableCollectionActions}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1.5 pt-1.5 pb-1.5 [-webkit-overflow-scrolling:touch]">
        <ColumnDropzone
          column={column}
          activeTaskId={activeTaskId}
          disableDragDrop={disableDragDrop}
          disableSorting={disableSorting}
        />
      </div>
      {sortHint && <ColumnSortHint label={sortHint} />}
    </div>
  );
}

export default memo(Column);
