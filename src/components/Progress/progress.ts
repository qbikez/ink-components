export type ProgressItemState =
  | "new"
  | "pending"
  | "starting"
  | "running"
  | "stopped"
  | "done"
  | "error"
  | "connected"
  | "disconnected"
  | "unknown";

export type ProgressUpdate = {
  state: ProgressItemState;
  status: string;
  details?: string;
  progress?: number;
};

export type ProgressItem = {
  id: number;
  log: string[];
} & ProgressUpdate;

export type Progress<TPath extends string | number | symbol> = {
  [key in TPath]?: ProgressItem;
};
