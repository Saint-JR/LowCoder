import { type SchemaStore } from '@low-coder/low-coder-store';
import { useMemo } from 'react';

export const useSchemaStore = (): SchemaStore => {
  const schemaStore = useMemo(() => {
    return window.schemaStore;
  }, []);

  return schemaStore;
};
