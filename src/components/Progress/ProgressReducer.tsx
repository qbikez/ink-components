import React, { useReducer } from "react";
import { Progress, ProgressItem, ProgressUpdate } from "./progress.js";

export type ProgressWrapper<TPath extends string | number | symbol> = {
  root: Progress<TPath>;
  id: number;
};

type UpdateAction<TPath extends string | number | symbol> = {
  type: "update";
  path: TPath;
  value: Partial<ProgressUpdate>;
};
type LogAction<TPath extends string | number | symbol> = {
  type: "log";
  path: TPath;
  lines: string[];
};
type RefreshAction = {
  type: "refresh";
};
export type ProgressAction<TPath extends string | number | symbol> =
  | UpdateAction<TPath>
  | LogAction<TPath>
  | RefreshAction;

export class ProgressReducer<TPath extends string | number | symbol> {
  public state: ProgressWrapper<TPath>;
  public dispatch: React.Dispatch<ProgressAction<TPath>>;

  constructor(
    state: ProgressWrapper<TPath>,
    dispatch: React.Dispatch<ProgressAction<TPath>>
  ) {
    this.state = state;
    this.dispatch = dispatch;
  }

  public update(path: TPath, value: Partial<ProgressUpdate>) {
    this.dispatch({
      type: "update",
      path,
      value,
    });
  }

  log(path: TPath, lines: string[]) {
    this.dispatch({
      type: "log",
      path,
      lines,
    });
  }

  logWithoutUpdate(path: TPath, lines: string[]) {
    if (!this.state.root[path]) {
      this.state.root[path] = {
        id: 0,
        log: [],
        status: "",
        state: "new",
      };
    }
    const log = this.state.root[path]!.log;

    this.state.root[path]!.log = [...log, ...lines];
  }
}


export function progressReducer<TPath extends string | number | symbol>(
  state: ProgressWrapper<TPath>,
  action: ProgressAction<TPath>
): ProgressWrapper<TPath> {
  //console.log("Progress reducer", action);
  const { root } = state;
  switch (action.type) {
    case "update":
      //console.log("Progress reducer update", action);
      return update(action);
    case "log":
      return log(action);
    case "refresh":
      return { ...state };
  }

  function log(action: LogAction<TPath>) {
    const { lines, path } = action;
    const item: ProgressItem = root[path] ?? {
      state: "new",
      status: "",
      log: [],
      id: 0,
    };

    // avoid to much object copying and just push lines to existing log array
    item.log.push(...lines);

    root[path] = {
      ...item,
      id: item.id + 1,
    };

    return { root, id: state.id + 1 };
  }

  function update(action: UpdateAction<TPath>) {
    const { path, value } = action;
    const item: ProgressItem = root[path] ?? {
      id: 0,
      state: "new",
      status: "",
      log: [""],
    };

    // creating a new object here means we cannot hold on to the ProgressItem value anywhere else in the code (i.e. when building status tree)
    root[path] = {
      ...item,
      ...value,
      id: item.id + 1,
    };

    return { root, id: state.id + 1 };
  }
}


export function createProgress<TPath extends string | number | symbol>(
  initialState?: ProgressWrapper<TPath>
) {
  initialState ??= {
    id: 0,
    root: {},
  };

  const [state, dispatch] = useReducer(progressReducer, initialState);
  const progress = new ProgressReducer(state, dispatch);

  return progress;
}