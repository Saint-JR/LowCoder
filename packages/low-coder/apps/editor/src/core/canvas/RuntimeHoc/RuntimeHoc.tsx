import { type Material, type SchemaNode } from '@low-coder/low-coder-store';
import React, { type MemoExoticComponent } from 'react';

import { NodeType } from '../../store/type';

interface RenderNode extends Omit<SchemaNode, 'slot' | 'material'> {
  material: Material | null;
  slot: unknown;
}

const RuntimeHoc = (
  renderNode: RenderNode,
  ReactInstance: typeof React,
): MemoExoticComponent<(props: any) => JSX.Element> | null => {
  const { id, material } = renderNode;
  const ContentComponent = material?.content as (props: any) => JSX.Element;

  if (!ContentComponent) {
    return null;
  }

  const ComponentWithHoc = ReactInstance.memo((props: any) => {
    return (
      <div
        low-coder-node="true"
        low-coder-id={id}
        low-coder-node-id={id}
        low-coder-node-type={NodeType.Component}
        style={{ display: 'contents' }}
      >
        <ContentComponent {...props} />
      </div>
    );
  });

  return ComponentWithHoc;
};

export default RuntimeHoc;
