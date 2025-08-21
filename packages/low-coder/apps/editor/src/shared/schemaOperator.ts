import { getSchema, SchemaNodePosition } from '@low-coder/low-coder-shared';
import {
  type Schema,
  type SchemaNode,
  setSchema,
} from '@low-coder/low-coder-store';
import { isNil } from 'lodash';

import editorStore from '../core/store/editorStore';
import { NodeType } from '../core/store/type';

class SchemaOperator {
  public setSchema = (schema: Schema) => {
    setSchema(schema);
  };

  public getSchema = () => {
    return getSchema();
  };

  // 刷新schema。用于触发schema更新。
  public refreshSchema = () => {
    const schema = this.getSchema();
    if (schema) {
      this.setSchema({ ...schema });
    }
  };

  // 添加节点。注意：会导致副作用，此函数直接更改原对象
  public addNode = (nextNode: SchemaNode, position: SchemaNodePosition) => {
    const { parentNode, slotNode, index } = position;

    if (!parentNode || !slotNode) {
      return;
    }

    // 说明选中的是slot节点
    if (isNil(index)) {
      slotNode.content.push(nextNode);
    } else {
      // 说明选中的是schema节点
      slotNode.content.splice(index, 0, nextNode);
    }

    this.refreshSchema();
  };

  // 替换节点。注意：会导致副作用，此函数直接更改原对象
  public replaceNode = (nextNode: SchemaNode, position: SchemaNodePosition) => {
    const { parentNode, slotNode, index } = position;

    if (!parentNode || !slotNode) {
      return;
    }

    // 说明选中的是slot节点
    if (isNil(index)) {
      slotNode.content = [nextNode];
    } else {
      // 说明选中的是schema节点
      slotNode.content.splice(index, 1, nextNode);
    }

    this.refreshSchema();

    // 选中新增的节点
    editorStore.selectNode({
      id: nextNode.id,
      nodeType: NodeType.Component,
      nodeId: nextNode.id,
    });
  };
}

export const schemaOperator = new SchemaOperator();
