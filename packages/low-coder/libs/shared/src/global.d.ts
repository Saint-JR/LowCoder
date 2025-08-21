import {
  type MaterialStore,
  type SchemaStore,
} from '@low-coder/low-coder-store';

export {}; // 确保它是一个模块

declare global {
  interface Window {
    schemaStore: SchemaStore;
    materialStore: MaterialStore;
  }
}
