import type { ComponentType } from "react";
import { BarChartModel } from "./bar-chart";
import { BugModel } from "./bug";
import { CalendarModel } from "./calendar";
import { CheckBadgeModel } from "./check-badge";
import { GearModel } from "./gear";
import { KanbanBoardModel } from "./kanban-board";
import { MilestoneFlagModel } from "./milestone-flag";
import { PieChartModel } from "./pie-chart";
import { StopwatchModel } from "./stopwatch";
import { TaskCardModel } from "./task-card";
import type { ModelProps } from "./types";

// Project-management objects built from three.js primitives, so the scene
// ships no model files and fetches nothing at runtime.
export const WORK_MODELS = {
  taskCard: TaskCardModel,
  kanbanBoard: KanbanBoardModel,
  checkBadge: CheckBadgeModel,
  bug: BugModel,
  barChart: BarChartModel,
  pieChart: PieChartModel,
  calendar: CalendarModel,
  stopwatch: StopwatchModel,
  milestoneFlag: MilestoneFlagModel,
  gear: GearModel,
} satisfies Record<string, ComponentType<ModelProps>>;

export type WorkModel = keyof typeof WORK_MODELS;
