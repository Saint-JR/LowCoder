export interface ServerOptions {
  port?: number;
  mainAppPath?: string;
  runtimeAppPath?: string;
  hmrPorts?: {
    main: number;
    runtime: number;
  };
}

export const DEFAULT_OPTIONS: ServerOptions = {
  port: 8000,
  mainAppPath: '../../../low-coder/apps/editor',
  runtimeAppPath: '../../../low-coder/apps/runtime',
  hmrPorts: {
    main: 8001,
    runtime: 8002,
  },
};
