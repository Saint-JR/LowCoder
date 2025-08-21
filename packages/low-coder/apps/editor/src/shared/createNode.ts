import {
  type Material,
  type SlotNode,
  type SchemaNode,
} from '@low-coder/low-coder-store';
import { v4 as uuidv4 } from 'uuid';

export const createNode = (material: Material): SchemaNode => {
  return {
    id: uuidv4(),
    name: material.id,
    title: material.title,
    material: material.id,
    style: Object.keys(material.styleVariable ?? {}).reduce(
      (acc, key) => {
        acc[key] = material.styleVariable[key]?.defaultValue ?? '';
        return acc;
      },
      {} as Record<string, string>,
    ),
    attribute: Object.keys(material.attribute ?? {}).reduce(
      (acc, key) => {
        acc[key] = material.attribute[key]?.defaultValue ?? '';
        return acc;
      },
      {} as Record<string, unknown>,
    ),
    hook: Object.keys(material.hook ?? {}).reduce(
      (acc, key) => {
        acc[key] = material.hook[key]?.defaultValue ?? '';
        return acc;
      },
      {} as Record<string, string>,
    ),
    slot: Object.keys(material.slot ?? {}).reduce(
      (acc, slotId) => {
        const slot = material.slot?.[slotId];
        if (!slot) {
          return acc;
        }
        acc[slotId] = {
          id: uuidv4(),
          name: slot.name,
          title: slot.title,
          visible: slot.visible ?? true,
          limit: slot.limit ?? null,
          content: [],
        };
        return acc;
      },
      {} as Record<string, SlotNode>,
    ),
  };
};
