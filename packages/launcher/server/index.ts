import express from 'express';
import { AddressInfo } from 'net';
import { DEFAULT_OPTIONS, ServerOptions } from './config/config';
import { setRouter } from './router/router';

const startServer = async (options: ServerOptions = {}) => {
  // 合并默认选项
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { port } = config;

  const app = express();

  try {
    // 添加路由
    await setRouter(app);

    // 启动服务器
    const server = app.listen(port, () => {
      const address = server.address() as AddressInfo;
      console.log(`
🚀 低代码开发服务器已启动:
   - 地址: http://localhost:${address.port}
   - 运行时: http://localhost:${address.port}/runtime
      `);
    });

    // 优雅关闭
    const gracefulShutdown = async () => {
      console.log('\n正在关闭服务器...');

      try {
        // 关闭 Express 服务器
        server.close(() => {
          console.log('服务器已成功关闭');
          process.exit(0);
        });
      } catch (err) {
        console.error('关闭服务器时出错:', err);
        process.exit(1);
      }
    };

    // 监听关闭信号
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    return {
      app,
      server,
      close: gracefulShutdown,
    };
  } catch (err) {
    console.error('启动开发服务器时出错:', err);
    process.exit(1);
  }
};

export { startServer };
