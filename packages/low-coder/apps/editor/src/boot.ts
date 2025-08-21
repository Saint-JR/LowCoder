import { initApp } from '@low-coder/low-coder-shared';
import {
  type SchemaStore,
  type MaterialStore,
} from '@low-coder/low-coder-store';

export const boot = (
  window: Window,
  initValue?: { schemaStore?: SchemaStore; materialStore?: MaterialStore },
) => {
  initApp(window, initValue);
};
