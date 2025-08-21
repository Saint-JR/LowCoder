import express from 'express';
import { createServer, ViteDevServer } from 'vite';
import { DEFAULT_OPTIONS } from '../config/config';
import { resolve } from 'path';

export const bootApp = async (app: express.Application) => {
  let mainSiteVite: ViteDevServer;
  let runtimeSiteVite: ViteDevServer;

  const { mainAppPath, runtimeAppPath, hmrPorts } = DEFAULT_OPTIONS;

  // 创建主应用的 Vite 服务器
  mainSiteVite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        port: hmrPorts?.main,
      },
    },
    root: resolve(__dirname, mainAppPath!),
    logLevel: 'info',
    clearScreen: false,
  });

  // 创建运行时应用的 Vite 服务器
  runtimeSiteVite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        port: hmrPorts?.runtime,
      },
    },
    root: resolve(__dirname, runtimeAppPath!),
    logLevel: 'info',
    clearScreen: false,
  });

  // 应用主要中间件
  app.use('/runtime', runtimeSiteVite.middlewares);
  app.use('/', mainSiteVite.middlewares);
};
