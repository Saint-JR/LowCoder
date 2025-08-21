import { Radio, RadioChangeEvent } from 'antd';
import { memo, useCallback, useMemo } from 'react';

import { AttributeItemProps } from '..';

const RadioItem = memo((props: AttributeItemProps) => {
  const { attribute, onChange } = props;

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      onChange?.({
        ...attribute,
        value: e.target.value,
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
        <Radio.Group
          style={{ width: '100%' }}
          defaultValue={attribute.value as string}
          block
          options={options}
          optionType="button"
          buttonStyle="solid"
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

export default RadioItem;
