import { Tabs } from 'antd';
import { memo, useMemo } from 'react';

import AttributePanel from './AttributePanel';

const ConfigPanel = memo(() => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: '属性',
        children: <AttributePanel />,
      },
      {
        key: '2',
        label: '样式',
      },
      {
        key: '3',
        label: '事件',
      },
    ],
    [],
  );

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
});

export default ConfigPanel;
