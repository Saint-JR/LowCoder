import { useEffect, useState } from 'react';

import { renderer } from '../renderer/renderer';

export const useRerender = () => {
  const [rerenderCount, setRerenderCount] = useState(0);

  useEffect(() => {
    return renderer.eventBus.subscribe('rerender', () => {
      setRerenderCount((prev) => prev + 1);
    });
  }, []);

  return rerenderCount;
};
