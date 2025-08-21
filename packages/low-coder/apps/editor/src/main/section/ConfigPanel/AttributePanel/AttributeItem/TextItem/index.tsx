import { Input } from 'antd';
import { memo, useCallback } from 'react';

import { AttributeItemProps } from '..';

const TextItem = memo((props: AttributeItemProps) => {
  const { attribute, onChange } = props;

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onChange?.({
        ...attribute,
        value: e.target.value,
      });
    },
    [attribute, onChange],
  );

  return (
    <div className="flex items-center gap-2">
      <div className="w-[80px] text-gray-500 text-sm">{attribute.title}</div>
      <div className="flex-1">
        <Input defaultValue={attribute.value as string} onBlur={handleBlur} />
      </div>
    </div>
  );
});

export default TextItem;
