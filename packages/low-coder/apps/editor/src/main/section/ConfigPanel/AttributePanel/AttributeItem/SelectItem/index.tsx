import { Select } from 'antd';
import { memo, useCallback, useMemo } from 'react';

import { AttributeItemProps } from '..';

const SelectItem = memo((props: AttributeItemProps) => {
  const { attribute, onChange } = props;

  const handleChange = useCallback(
    (value: string) => {
      onChange?.({
        ...attribute,
        value,
      });
    },
    [attribute, onChange],
  );

  const options = useMemo(() => {
    return (
      (attribute.enum ?? []).map((item) => ({
        label: item.label,
        value: item.value,
      })) ?? []
    );
  }, [attribute.enum]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-[80px] text-gray-500 text-sm">{attribute.title}</div>
      <div className="flex-1">
        <Select
          style={{ width: '100%' }}
          defaultValue={attribute.value as string}
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
});

export default SelectItem;
