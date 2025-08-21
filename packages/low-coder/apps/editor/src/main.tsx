import { materialStore, schemaStore } from '@low-coder/low-coder-store';
import { Provider } from 'mobx-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { boot } from './boot.ts';
import store from './store/index.ts';

import './index.css';

boot(globalThis.window, {
  schemaStore: schemaStore,
  materialStore: materialStore,
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
