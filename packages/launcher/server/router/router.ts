import express from 'express';
import { bootApp } from '../boot/boot';

export const setRouter = async (app: express.Application) => {
  // 应用主要中间件
  await bootApp(app);

  // 添加健康检查端点
  app.get('/healthcheck', (_req: express.Request, res: express.Response) => {
    res.status(200).send('OK');
  });

  // 处理 404
  app.use((_req: express.Request, res: express.Response) => {
    res.status(404).send('Not Found');
  });

  // 错误处理中间件
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error('Server error:', err);
      res.status(500).send('Internal Server Error');
      next();
    },
  );
};
