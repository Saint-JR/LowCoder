export const getSchema = () => {
  return window?.schemaStore?.getState()?.schema ?? null;
};
