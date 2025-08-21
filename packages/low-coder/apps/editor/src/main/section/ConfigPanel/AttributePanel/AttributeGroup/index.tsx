import { memo } from 'react';

export interface AttributeGroupProps {
  group: string;
  children: React.ReactNode;
}

const AttributeGroup = memo((props: AttributeGroupProps) => {
  const { group, children } = props;

  return (
    <div className="w-full">
      <div className="bg-gray-100 border-t-[1px] border-b-[1px] border-gray-300 px-[10px] py-[5px] flex items-center text-gray-500">
        {group || '基础'}
      </div>

      <div className="flex flex-col gap-2 p-[10px]">{children}</div>
    </div>
  );
});

export default AttributeGroup;
