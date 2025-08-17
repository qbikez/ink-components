import React, { act, useReducer } from "react";
import {
  CommandDescription,
  createProgressItem,
  ProgressState,
  ProgressItem,
  ProgressUpdate,
} from "./progressItem.js";

export type ProgressWrapper<TPath extends string | number | symbol> = {
  root: ProgressState<TPath>;
  id: number;
};

type UpdateAction<TPath extends string | number | symbol> = {
  type: "update";
  path: TPath;
  value: ProgressUpdate;
};
type LogAction<TPath extends string | number | symbol> = {
  type: "log";
  path: TPath;
  lines: string[];
};
type RefreshAction = {
  type: "refresh";
};
type SetCommandsAction<TPath extends string | number | symbol> = {
  type: "setCommands";
  path: TPath;
  commands: CommandDescription[];
};

export type ProgressAction<TPath extends string | number | symbol> =
  | UpdateAction<TPath>
  | LogAction<TPath>
  | RefreshAction
  | SetCommandsAction<TPath>;

export class Progress<TPath extends string | number | symbol> {
  public state: ProgressWrapper<TPath>;
  private dispatch: React.Dispatch<ProgressAction<TPath>>;

  constructor(
    state: ProgressWrapper<TPath>,
    dispatch: React.Dispatch<ProgressAction<TPath>>
  ) {
    this.state = state;
    this.dispatch = dispatch;
  }

  public update(path: TPath, value: ProgressUpdate) {
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
    this.state.root[path] ??= createProgressItem();
    const log = this.state.root[path]!.log;

    this.state.root[path]!.log = [...log, ...lines];
  }

  public setCommands(path: TPath, commands: CommandDescription[]) {
    this.dispatch({
      type: "setCommands",
      path,
      commands,
    });
  }

  refresh() {
    this.dispatch({ type: "refresh" });
  }

  public static reducer<TPath extends string | number | symbol>(
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
      case "setCommands":
        return setCommands(action);
      case "refresh":
        return { ...state };
    }

    function log(action: LogAction<TPath>) {
      const { lines, path } = action;
      const item: ProgressItem = root[path] ?? createProgressItem();

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
      const item: ProgressItem = root[path] ?? createProgressItem();

      // creating a new object here means we cannot hold on to the ProgressItem value anywhere else in the code (i.e. when building status tree)
      root[path] = {
        ...item,
        ...value,
        id: item.id + 1,
      };

      return { root, id: state.id + 1 };
    }

    function setCommands(action: SetCommandsAction<TPath>) {
      const { path, commands } = action;
      const item: ProgressItem = root[path] ?? createProgressItem();

      item.commands = commands;

      root[path] = {
        ...item,
        commands,
        id: item.id + 1,
      };

      return { root, id: state.id + 1 };
    }
  }
}

export function createProgress<TPath extends string | number | symbol>(
  initialState?: ProgressWrapper<TPath>
) {
  initialState ??= {
    id: 0,
    root: {},
  };

  const [state, dispatch] = useReducer(Progress.reducer, initialState);
  const progress = new Progress(state, dispatch);

  return progress;
}
