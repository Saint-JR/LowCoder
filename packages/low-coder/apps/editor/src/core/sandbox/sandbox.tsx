import { memo, useEffect, useRef } from 'react';
import { destroyApp, startApp } from 'wujie';

import subAppInitializer, { renderSelectedElement } from './subAppInitializer';
import RuntimeHoc from '../canvas/RuntimeHoc/RuntimeHoc';
import SlotHoc from '../canvas/SlotHoc/SlotHoc';

const Sandbox = memo(() => {
  const runtimeSandboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // todo: 需要根据环境来配置url
    startApp({
      name: 'runtime',
      url: 'http://localhost:8000/runtime',
      degrade: true,
      sync: false,
      el: runtimeSandboxRef.current!,
      props: {
        runtimeHoc: RuntimeHoc,
        slotHoc: SlotHoc,
        lifeCycle: {
          afterRender: [renderSelectedElement],
        },
      },
      beforeMount: (appWindow: Window) => {
        subAppInitializer.setAppWindow(appWindow);
        subAppInitializer.initSubApp();
      },
      beforeUnmount: () => {
        subAppInitializer.destroySubApp();
      },
    });

    return () => {
      destroyApp('runtime');
    };
  }, []);

  return (
    <div
      id="runtime-sandbox"
      ref={runtimeSandboxRef}
      className="w-full h-full"
    />
  );
});

export default Sandbox;
