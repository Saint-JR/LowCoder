import { useState } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';

export interface ExpandedSideBarProps {
  open: boolean;
  children: JSX.Element;
}

const WIDTH = 300;

const ExpandedSideBar = memo((props: ExpandedSideBarProps) => {
  const { open, children } = props;

  const [width, setWidth] = useState('0px');

  useEffect(() => {
    if (open) {
      setWidth(`${WIDTH}px`);
    } else {
      setWidth('0px');
    }
  }, [open]);

  return (
    <div className="relative z-0 h-full" style={{ width: width }}>
      <div
        className="h-full bg-white box-border  border-r-[1px] border-solid border-[var(--low-coder-border-gray)] absolute transition-transform"
        style={{
          transform: `translateX(${open ? 0 : -1 * WIDTH}px)`,
          width: `${WIDTH}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default ExpandedSideBar;
