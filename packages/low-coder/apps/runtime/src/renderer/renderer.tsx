import {
  type Variable,
  type Material,
  type Schema,
  type SchemaNode,
} from '@low-coder/low-coder-store';
import { makeAutoObservable } from 'mobx';
import { createRoot, Root } from 'react-dom/client';

import EventBus from './eventBus';
import LifeCycle from './lifecycle';
import { RenderLifeCycle, RenderNodeProps, RenderSlotProps } from './type';
import NodePod from '../nodePod/NodePod';
import SlotPod from '../nodePod/slotPod';
import { RenderNodeHoc, RenderSlotHoc } from '../type/wujie.type';

class Renderer {
  // 渲染根节点
  private root: Root | null;
  // 生命周期
  private lifeCycle: LifeCycle;

  // 以下为运行时状态
  // 节点缓存
  private nodeCache: Map<string, NodePod>;
  // 插槽缓存
  private slotCache: Map<string, SlotPod>;
  // 运行时全局状态库
  private globalStore: Record<string, unknown>;
  // 事件总线
  public eventBus: EventBus;

  constructor() {
    this.root = null;
    this.lifeCycle = new LifeCycle();
    this.nodeCache = new Map();
    this.slotCache = new Map();
    this.globalStore = {};
    this.eventBus = new EventBus();
  }

  public setRoot(rootDom: HTMLElement | null) {
    if (!rootDom) {
      this.root = null;
      return;
    }
    if (this.root) {
      return;
    }

    const rootElement = createRoot(rootDom);
    this.root = rootElement;
  }

  public setLifeCycle(lifeCycle: RenderLifeCycle | null) {
    this.lifeCycle.setLifeCycle(lifeCycle);
  }

  public setRuntimeHoc(runtimeHoc: RenderNodeHoc | null) {
    NodePod.setRuntimeHoc(runtimeHoc);
  }

  public setSlotHoc(slotHoc: RenderSlotHoc | null) {
    SlotPod.setSlotHoc(slotHoc);
  }

  public createNode(
    renderNodeProps: RenderNodeProps,
  ): (props: any) => JSX.Element | null {
    // 更换物料也会重新生成schema节点，因此schemaNode的id是绝对唯一的
    const cacheKey = renderNodeProps.renderNode.id;
    const cachedNode = this.nodeCache.get(cacheKey);
    if (cachedNode) {
      cachedNode.updateRenderNode(renderNodeProps);
      return cachedNode.getRenderNode();
    }

    const nodePod = new NodePod(renderNodeProps);

    this.nodeCache.set(cacheKey, nodePod);

    return nodePod.getRenderNode();
  }

  public createSlot(slot: RenderSlotProps) {
    const cacheKey = slot.id;
    const cachedSlot = this.slotCache.get(cacheKey);
    if (cachedSlot) {
      cachedSlot.updateRenderSlot(slot);
      return cachedSlot.getRenderSlot();
    }

    const slotPod = new SlotPod(slot);

    this.slotCache.set(cacheKey, slotPod);

    return slotPod.getRenderSlot();
  }

  // 运行时全局变量仓库（mobx）
  public createGlobalStore(variables: Variable[]) {
    const globalStore = variables.reduce(
      (prevStore, variable) => {
        Reflect.set(prevStore, variable.name, variable.defaultValue);
        return prevStore;
      },
      {} as Record<string, unknown>,
    );

    // 将其变为响应式
    makeAutoObservable(globalStore);

    this.globalStore = globalStore;
  }

  public render(schema: Schema | null, materialIdMap: Map<string, Material>) {
    if (!this.root || !schema) {
      return;
    }

    this.createGlobalStore(schema.globalVariables);
    const schemaRootNode = schema.content;

    const renderSchemaNode = (schemaNode: SchemaNode) => {
      const material = materialIdMap.get(schemaNode.material) ?? null;

      return this.createNode({
        renderNode: {
          ...schemaNode,
          material,
          slot: Object.keys(schemaNode.slot ?? {}).reduce(
            (prevSlot, slotKey) => {
              if (!schemaNode.slot) {
                return prevSlot;
              }
              const slot = schemaNode.slot[slotKey];

              prevSlot[slotKey] = this.createSlot({
                ...slot,
                nodeId: schemaNode.id,
                content: slot.content.map((slotContent) =>
                  renderSchemaNode(slotContent),
                ),
              }) as (props: any) => JSX.Element | null;

              return prevSlot;
            },
            {} as Record<string, (props: any) => JSX.Element | null>,
          ),
        },
        context: {
          global: this.globalStore,
          local: {},
        },
      });
    };

    this.lifeCycle.triggerBeforeRender();

    const SchemaRootElement = renderSchemaNode(schemaRootNode);

    this.root.render(<SchemaRootElement />);

    this.lifeCycle.triggerAfterRender();
    // 垃圾清理（节点缓存）
  }
}

const renderer = new Renderer();

export { renderer };
