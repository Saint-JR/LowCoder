import {
  type MaterialStore,
  type SchemaStore,
} from '@low-coder/low-coder-store';

export {}; // 确保它是一个模块

export declare class EventBus {
  private id;
  private eventObj;
  constructor(id: string);
  $on(event: string, fn: callback): EventBus;
  /** 任何$emit都会导致监听函数触发，第一个参数为事件名，后续的参数为$emit的参数 */
  $onAll(fn: (event: string, ...args: Array<any>) => any): EventBus;
  $once(event: string, fn: callback): void;
  $off(event: string, fn: callback): EventBus;
  $offAll(fn: callback): EventBus;
  $emit(event: string, ...args: Array<any>): EventBus;
  $clear(): EventBus;
}

declare global {
  interface Window {
    __POWERED_BY_WUJIE__?: boolean;
    __WUJIE_MOUNT?: () => void;
    __WUJIE_UNMOUNT?: () => void;
    __WUJIE_PUBLIC_PATH__?: string;
    $wujie?: {
      bus: EventBus;
      shadowRoot?: ShadowRoot;
      props?: { [key: string]: any };
      location?: object;
    };
    schemaStore: SchemaStore;
    materialStore: MaterialStore;
  }
}
