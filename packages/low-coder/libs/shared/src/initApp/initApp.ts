/// <reference lib="dom" />

import {
  type SchemaStore,
  type MaterialStore,
} from '@low-coder/low-coder-store';

export const initApp = (
  appWindow: Window,
  initValue: { schemaStore?: SchemaStore; materialStore?: MaterialStore } = {},
) => {
  const { schemaStore: initSchemaStore, materialStore: initMaterialStore } =
    initValue;

  if (
    !Reflect.has(appWindow, 'schemaStore') ||
    !Reflect.has(appWindow, 'materialStore')
  ) {
    Object.defineProperties(appWindow, {
      schemaStore: {
        get: () => {
          return initSchemaStore ?? {};
        },
      },
      materialStore: {
        get: () => {
          return initMaterialStore ?? {};
        },
      },
    });
  }
};
