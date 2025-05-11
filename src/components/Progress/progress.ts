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

export type ProgressItem = {
  id: number;
  log: string[];

  state: ProgressItemState;
  status: string;
  details?: string;
  progress?: number;

  commands: CommandDescription[];
};

export type CommandDescription = {
  name: string;
  description: string;
  key: string;
};

export type ProgressUpdate = Partial<Omit<ProgressItem, "id" | "log">>;

export type Progress<TPath extends string | number | symbol> = {
  [key in TPath]?: ProgressItem;
};

export function createProgressItem(): ProgressItem {
  return {
    id: 0,
    state: "new",
    status: "",
    log: [""],
    commands: [],
  };
}
