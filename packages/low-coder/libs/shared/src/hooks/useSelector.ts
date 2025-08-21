import { type Store } from '@low-coder/low-coder-store';
import { useEffect, useRef, useState } from 'react';

/**
 * 自定义useSelector钩子，用于从全局store中选择数据
 * 特别优化以适配createSelector创建的记忆化选择器
 *
 * @param selector 选择器函数，从store state中提取特定数据，可以是createSelector创建的
 * @param store Redux store实例
 * @param equalityFn 可选的相等性比较函数，用于决定是否需要更新
 * @returns 选择器返回的数据
 */
export const useSelector = <TSelected>(
  selector: (state: any) => TSelected,
  store: Store,
  equalityFn: (left: TSelected, right: TSelected) => boolean = (a, b) =>
    a === b,
): TSelected => {
  const [selectedState, setSelectedState] = useState(() =>
    selector(store.getState()),
  );

  // 上一次的值
  const latestSelectedState = useRef(selectedState);

  useEffect(() => {
    const callback = () => {
      const newSelected = selector(store.getState());
      if (!equalityFn(newSelected, latestSelectedState.current)) {
        latestSelectedState.current = newSelected;
        setSelectedState(newSelected);
      }
    };
    const unsubscribe = store.subscribe(callback);

    // 马上检查一次（防止有初始漏数据）
    callback();

    return unsubscribe;
  }, []);

  return selectedState;
};
