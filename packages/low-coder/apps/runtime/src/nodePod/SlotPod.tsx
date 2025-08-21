import { Fragment, memo } from 'react';
import React from 'react';

import { RenderSlotProps } from '../renderer/type';
import { useRerender } from '../shared/useRerender';
import { RenderSlotHoc } from '../type/wujie.type';

const DefaultSlotPod = () => {
  const SlotPod = memo((props: { slot: RenderSlotProps }) => {
    const { slot } = props;

    return (
      <Fragment>
        {slot?.content &&
          slot.content.map((SlotContent, index) => <SlotContent key={index} />)}
      </Fragment>
    );
  });

  return SlotPod;
};

class SlotPod {
  // 参数
  private renderSlotProps: RenderSlotProps;
  // 组件
  private RenderSlot: React.MemoExoticComponent<() => JSX.Element | null>;
  // 运行时高阶组件
  private static SlotHoc: RenderSlotHoc | null;

  constructor(renderSlotProps: RenderSlotProps) {
    this.renderSlotProps = renderSlotProps;

    const ContentComponent = SlotPod.SlotHoc
      ? SlotPod.SlotHoc(React)
      : DefaultSlotPod();

    this.RenderSlot = memo(() => {
      useRerender();

      return ContentComponent ? (
        <ContentComponent
          key={this.renderSlotProps.id}
          slot={this.renderSlotProps}
        />
      ) : null;
    });
  }

  getRenderSlot() {
    return this.RenderSlot;
  }

  updateRenderSlot(renderSlotProps: RenderSlotProps) {
    this.renderSlotProps = renderSlotProps;
  }

  static setSlotHoc(SlotHoc: RenderSlotHoc | null) {
    this.SlotHoc = SlotHoc;
  }
}

export default SlotPod;
