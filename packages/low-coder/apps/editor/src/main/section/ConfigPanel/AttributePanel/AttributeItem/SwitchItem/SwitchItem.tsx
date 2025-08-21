import { Switch } from 'antd';
import { memo, useCallback } from 'react';

import { AttributeItemProps } from '..';

const SwitchItem = memo((props: AttributeItemProps) => {
  const { attribute, onChange } = props;

  const handleChange = useCallback(
    (checked: boolean) => {
      onChange?.({
        ...attribute,
        value: checked,
      });
    },
    [attribute, onChange],
  );

  return (
    <div className="flex items-center gap-2">
      <div className="w-[80px] text-gray-500 text-sm">{attribute.title}</div>
      <div className="flex-1">
        <Switch
          defaultChecked={attribute.value as boolean}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

export default SwitchItem;
