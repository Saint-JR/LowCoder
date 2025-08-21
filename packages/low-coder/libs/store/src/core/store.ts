/**
 * 简易Redux实现
 *
 * 实现了Redux的核心功能：
 * 1. 创建store
 * 2. 获取state
 * 3. 派发action
 * 4. 订阅state变化
 * 5. 组合reducers
 */

// Action接口
export interface Action<T = any> {
  type: string;
  payload?: T;
}

// Reducer类型
export type Reducer<S = any, A extends Action = Action> = (
  state: S,
  action: A,
) => S;

// Store类
export class Store<S = any> {
  private state: S;
  private reducer: Reducer<S>;
  private listeners: Map<number, () => void> = new Map();
  private nextListenerId = 0;
  private isDispatching = false;

  /**
   * 创建一个Store实例
   * @param reducer 处理action的reducer函数
   * @param preloadedState 初始状态
   */
  constructor(reducer: Reducer<S>, preloadedState?: S) {
    this.reducer = reducer;
    this.state = preloadedState as S;
  }

  /**
   * 获取当前状态
   */
  getState(): S {
    if (this.isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing.',
      );
    }
    return this.state;
  }

  /**
   * 派发一个action
   * @param action 要派发的action
   */
  dispatch<A extends Action>(action: A): A {
    if (this.isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      this.isDispatching = true;
      this.state = this.reducer(this.state, action);
    } finally {
      this.isDispatching = false;
    }

    // 通知所有监听器
    this.listeners.forEach((listener) => listener());

    return action;
  }

  /**
   * 订阅状态变化
   * @param listener 状态变化时的回调函数
   * @returns 取消订阅的函数
   */
  subscribe(listener: () => void): () => void {
    if (this.isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing.',
      );
    }

    const id = this.nextListenerId++;
    this.listeners.set(id, listener);
    let isSubscribed = true;

    // 返回取消订阅的函数
    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      this.listeners.delete(id);
    };
  }
}

/**
 * 创建store的工厂函数
 * @param reducer 根reducer
 * @param preloadedState 初始状态
 * @returns 创建的Store实例
 */
export function createStore<S>(
  reducer: Reducer<S>,
  preloadedState?: S,
): Store<S> {
  return new Store<S>(reducer, preloadedState);
}

/**
 * 组合多个reducers为一个
 * @param reducers 一个包含多个reducer的对象
 * @returns 组合后的reducer
 */
export function combineReducers<S>(reducers: {
  [K in keyof S]: Reducer<S[K]>;
}): Reducer<S> {
  const reducerKeys = Object.keys(reducers) as Array<keyof S>;

  // 返回一个组合后的reducer函数
  return function combination(state: S = {} as S, action: Action): S {
    let hasChanged = false;
    const nextState: S = {} as S;

    for (const key of reducerKeys) {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}
