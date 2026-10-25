const DEFAULT_COLUMN_ACCENTS = {
  "to-do": "var(--column-todo)",
  "in-progress": "var(--column-progress)",
  "in-review": "var(--column-review)",
  done: "var(--column-done)",
  planned: "var(--column-planned)",
  archived: "var(--column-archived)",
} as const;

const CUSTOM_COLUMN_ACCENTS = [
  "var(--aurora-sky)",
  "var(--aurora-fuchsia)",
  "var(--aurora-indigo)",
  "var(--aurora-amber)",
  "var(--aurora-emerald)",
  "var(--aurora-violet)",
] as const;

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

// Built-in statuses keep a fixed colour; custom columns get a stable one from
// the palette so a column never changes colour between visits.
export function getColumnAccent(columnId: string, isFinal?: boolean) {
  if (Object.hasOwn(DEFAULT_COLUMN_ACCENTS, columnId)) {
    return DEFAULT_COLUMN_ACCENTS[
      columnId as keyof typeof DEFAULT_COLUMN_ACCENTS
    ];
  }
  if (isFinal) return DEFAULT_COLUMN_ACCENTS.done;
  return CUSTOM_COLUMN_ACCENTS[
    hashString(columnId) % CUSTOM_COLUMN_ACCENTS.length
  ];
}
