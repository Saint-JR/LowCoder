import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';

interface SideBarProps {
  onExpand: () => void;
  children: JSX.Element;
}

const SideBar = memo((props: SideBarProps) => {
  const { onExpand, children } = props;

  return (
    <div className="w-[50px] bg-[var(--low-coder-bg-gray)] border-r-[1px] border-solid border-[var(--low-coder-border-gray)] z-10 relative flex flex-col p-[6px] justify-between items-center">
      <div className="flex flex-col gap-[15px]">
        {children}
        <Button type="text" icon={<MenuUnfoldOutlined />} onClick={onExpand} />
      </div>
    </div>
  );
});

export default SideBar;
