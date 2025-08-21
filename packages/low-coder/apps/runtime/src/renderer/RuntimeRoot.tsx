import {
  useMaterialStore,
  useSchemaStore,
  useSelector,
} from '@low-coder/low-coder-shared';
import { selectMaterialIdMap, selectSchema } from '@low-coder/low-coder-store';
import { memo, useEffect } from 'react';

import { renderer } from './renderer';
import { useWujieProps } from '../shared/useWujie';
import { RenderNodeHoc, RenderSlotHoc } from '../type/wujie.type';

const RuntimeRoot = memo(() => {
  const wujieProps = useWujieProps();

  const schemaStore = useSchemaStore();
  const materialStore = useMaterialStore();

  const schema = useSelector(selectSchema, schemaStore);
  const materialIdMap = useSelector(selectMaterialIdMap, materialStore);

  // 初始化渲染器
  useEffect(() => {
    const root = document.getElementById('runtime-root');
    if (!root) {
      return;
    }

    // 设置根容器
    renderer.setRoot(root);
    // 设置运行时高阶组件
    renderer.setRuntimeHoc((wujieProps?.runtimeHoc as RenderNodeHoc) ?? null);
    // 设置插槽高阶组件
    renderer.setSlotHoc((wujieProps?.slotHoc as RenderSlotHoc) ?? null);
    // 设置生命周期
    renderer.setLifeCycle({
      beforeRender: wujieProps?.lifeCycle?.beforeRender ?? [],
      afterRender: [
        ...(wujieProps?.lifeCycle?.afterRender ?? []),
        () => {
          renderer.eventBus.trigger('rerender');
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 渲染
  useEffect(() => {
    renderer.render(schema, materialIdMap);
  }, [schema, materialIdMap]);

  return <div id="runtime-root" />;
});

export default RuntimeRoot;
