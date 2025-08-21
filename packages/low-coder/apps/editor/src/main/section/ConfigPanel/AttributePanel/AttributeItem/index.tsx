import { AttributeType } from '@low-coder/low-coder-store';
import { memo } from 'react';

import { AttributeItem as AttributeItemType } from '../type';
import RadioItem from './RadioItem';
import SelectItem from './SelectItem';
import SwitchItem from './SwitchItem/SwitchItem';
import TextItem from './TextItem';

export interface AttributeItemProps {
  attribute: AttributeItemType;
  onChange?: (attribute: AttributeItemType) => void;
}

const AttributeItem = memo((props: AttributeItemProps) => {
  const { attribute, onChange } = props;

  if (attribute.type === AttributeType.String) {
    return <TextItem attribute={attribute} onChange={onChange} />;
  }

  if (attribute.type === AttributeType.Enum) {
    if ((attribute.enum?.length ?? Infinity) <= 3) {
      return <RadioItem attribute={attribute} onChange={onChange} />;
    }
    return <SelectItem attribute={attribute} onChange={onChange} />;
  }

  if (attribute.type === AttributeType.Boolean) {
    return <SwitchItem attribute={attribute} onChange={onChange} />;
  }

  return null;
});

export default AttributeItem;
