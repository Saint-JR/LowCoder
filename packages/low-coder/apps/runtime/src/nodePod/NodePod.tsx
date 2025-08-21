import { observer } from 'mobx-react';
import React from 'react';

import { RenderNodeProps } from '../renderer/type';
import { useRerender } from '../shared/useRerender';
import { RenderNodeHoc } from '../type/wujie.type';
import { parseExpression } from '../utils/utils';

class NodePod {
  // 参数
  private renderNodeProps: RenderNodeProps;
  // 组件
  private RenderNode: (props: any) => JSX.Element | null;
  // 运行时高阶组件
  private static RuntimeHoc: RenderNodeHoc | null;

  constructor(renderNodeProps: RenderNodeProps) {
    this.renderNodeProps = renderNodeProps;

    const ContentComponent = NodePod.RuntimeHoc
      ? NodePod.RuntimeHoc(this.renderNodeProps.renderNode, React)
      : ((this.renderNodeProps.renderNode.material?.content as (
          props: any,
        ) => JSX.Element) ?? null);

    this.RenderNode = observer((props: any) => {
      useRerender();

      // 不能使用 useMemo （原因是在未执行的时候我们不能知道该组件依赖了哪个字段，就无法使用useMemo），直接依赖 mobx 的细粒度依赖追踪
      const parameters = {
        ...Object.entries(
          this.renderNodeProps.renderNode?.attribute ?? {},
        ).reduce(
          (prevAttribute, [key, value]) => {
            prevAttribute[key] = parseExpression(value as string, {
              props,
              ...this.renderNodeProps.context,
            });
            return prevAttribute;
          },
          {} as Record<string, unknown>,
        ),
        ...Object.entries(this.renderNodeProps.renderNode?.hook ?? {}).reduce(
          (prevHook, [key, value]) => {
            prevHook[key] = parseExpression(value as string, {
              props,
              ...this.renderNodeProps.context,
            });

            return prevHook;
          },
          {} as Record<string, unknown>,
        ),
        slot: this.renderNodeProps.renderNode?.slot,
      };

      return ContentComponent ? (
        <ContentComponent
          key={this.renderNodeProps.renderNode.id}
          {...parameters}
        />
      ) : null;
    });
  }

  getRenderNode() {
    return this.RenderNode;
  }

  updateRenderNode(renderNodeProps: RenderNodeProps) {
    this.renderNodeProps = renderNodeProps;
  }

  static setRuntimeHoc(RuntimeHoc: RenderNodeHoc | null) {
    this.RuntimeHoc = RuntimeHoc;
  }
}

export default NodePod;
