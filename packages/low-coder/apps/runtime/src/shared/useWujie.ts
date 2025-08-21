import { useMemo } from 'react';

import { getWujie } from '../utils/utils';

export const useWujie = () => {
  return getWujie();
};

export const useWujieProps = () => {
  return getWujie()?.props;
};

export const useWujieBus = () => {
  return useMemo(() => {
    const bus = getWujie()?.bus;

    if (!bus) {
      return null;
    }

    const { $on, $onAll, $once, $off, $offAll, $emit, $clear } = bus;

    return {
      on: $on,
      onAll: $onAll,
      once: $once,
      off: $off,
      offAll: $offAll,
      emit: $emit,
      clear: $clear,
    };
  }, []);
};
