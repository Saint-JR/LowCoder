import {
  type SchemaNode,
  type Schema,
  type SlotNode,
} from '@low-coder/low-coder-store';
import { isSchemaNode } from './isSchemaNode';

export interface SchemaNodePosition {
  parentNode: SchemaNode;
  slotNode: SlotNode;
  index: number | null;
}

export interface GetNodeResult {
  node: SchemaNode | SlotNode;
  position: SchemaNodePosition | null;
}

export const getNodeInfo = (schema: Schema, nodeId: string) => {
  const walkSchema = (
    node: SchemaNode | SlotNode,
    position: SchemaNodePosition | null,
  ): GetNodeResult | null => {
    if (node.id === nodeId) {
      return {
        node: node,
        position,
      };
    }

    // schemaNode
    if (isSchemaNode(node)) {
      if (!node.slot || !Object.keys(node.slot).length) {
        return null;
      }

      for (const slotId in node.slot) {
        const slot = node.slot[slotId];
        const result = walkSchema(slot, {
          parentNode: node,
          slotNode: slot,
          index: null,
        });

        if (result) {
          return result;
        }
      }
    } else {
      // slotNode
      if (!node.content || !node.content.length) {
        return null;
      }

      for (const [index, content] of node.content.entries()) {
        const result = walkSchema(content, {
          parentNode: position!.parentNode,
          slotNode: position!.slotNode,
          index: index,
        });

        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  return walkSchema(schema.content, null);
};

export const getNode = (schema: Schema, nodeId: string) => {
  const nodeInfo = getNodeInfo(schema, nodeId);
  return nodeInfo?.node ?? null;
};

export const getNodePosition = (schema: Schema, nodeId: string) => {
  const nodeInfo = getNodeInfo(schema, nodeId);
  return nodeInfo?.position ?? null;
};
