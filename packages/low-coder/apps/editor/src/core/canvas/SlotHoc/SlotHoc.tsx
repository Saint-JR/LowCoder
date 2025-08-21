import { type SlotNode } from '@low-coder/low-coder-store';
import React, { FunctionComponent } from 'react';

import { NodeType } from '../../store/type';

export interface RenderSlot extends Omit<SlotNode, 'content'> {
  content: ((props?: any) => JSX.Element | null)[];
  nodeId: string;
}

const SlotHoc = (
  ReactInstance: typeof React,
): FunctionComponent<any> | null => {
  const SlotPod = (props: { slot: RenderSlot }) => {
    const { slot } = props;
    const { content } = slot;

    const style = ReactInstance.useMemo(() => {
      if (!content?.length) {
        return {
          height: '100px',
          width: '100%',
          backgroundColor: 'rgb(243,244,246)',
        };
      } else {
        return {
          display: 'contents',
        };
      }
    }, [content?.length]);

    return (
      <div
        style={style}
        low-coder-node="true"
        low-coder-id={slot.id}
        low-coder-node-id={slot.nodeId}
        low-coder-slot-id={slot.id}
        low-coder-node-type={NodeType.Slot}
      >
        {content.map((SlotContent, index) => (
          <SlotContent key={index} />
        ))}
      </div>
    );
  };

  return SlotPod;
};
export default SlotHoc;
