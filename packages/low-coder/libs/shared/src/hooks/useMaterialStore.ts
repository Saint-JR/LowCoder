import { type MaterialStore } from '@low-coder/low-coder-store';
import { useMemo } from 'react';

export const useMaterialStore = (): MaterialStore => {
  const materialStore = useMemo(() => {
    return globalThis.window.materialStore;
  }, []);

  return materialStore;
};
