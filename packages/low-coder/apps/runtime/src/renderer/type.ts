import {
  type SchemaNode,
  type SlotNode,
  type Material,
} from '@low-coder/low-coder-store';

export interface RenderNode extends Omit<SchemaNode, 'slot' | 'material'> {
  material: Material | null;
  slot: Record<string, (props?: any) => JSX.Element | null>;
}

export interface RenderNodeContext {
  global: Record<string, unknown>;
  local: Record<string, unknown>;
}

export interface RenderNodeProps {
  renderNode: RenderNode;
  context: RenderNodeContext;
}

export interface RenderSlotProps extends Omit<SlotNode, 'content'> {
  content: ((props?: any) => JSX.Element | null)[];
  nodeId: string;
}

export interface RenderLifeCycle {
  beforeRender?: (() => void)[] | (() => void);
  afterRender?: (() => void)[] | (() => void);
}
