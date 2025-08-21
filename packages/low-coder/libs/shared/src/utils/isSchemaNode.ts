import { type SchemaNode, type SlotNode } from '@low-coder/low-coder-store';

export const isSchemaNode = (
  node: SchemaNode | SlotNode,
): node is SchemaNode => {
  return 'material' in node;
};
