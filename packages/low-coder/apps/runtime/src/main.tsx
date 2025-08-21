import { materialStore } from '@low-coder/low-coder-store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { boot } from './boot';

import './index.css';

let root: ReturnType<typeof createRoot>;

// 无界沙箱环境下执行
if (window.__POWERED_BY_WUJIE__) {
  boot(globalThis.window, {
    schemaStore: globalThis.window.parent?.schemaStore,
    // 此时materialStore是对于editor和runtime是独立的两个实例
    materialStore: materialStore,
  });

  window.__WUJIE_MOUNT = () => {
    root = createRoot(document.getElementById('root')!);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  };
  window.__WUJIE_UNMOUNT = () => {
    root?.unmount();
  };
}
// 独立运行模式
else {
  boot(globalThis.window);

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
