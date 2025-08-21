import { memo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

import ExpandedSideBar from './ExpandedSideBar';
import SideBar from './SideBar';

export interface LeftLayoutProps {
  buttons: JSX.Element;
  content: JSX.Element;
}

const LeftLayout = memo((props: LeftLayoutProps) => {
  const { buttons, content } = props;

  const [expanded, setExpanded] = useState(true);

  const onExpand = useCallback(() => {
    setExpanded((prevValue) => !prevValue);
  }, [setExpanded]);

  return (
    <div className="h-full shrink-0 flex items-stretch">
      <SideBar onExpand={onExpand}>{buttons}</SideBar>
      <ExpandedSideBar open={expanded}>{content}</ExpandedSideBar>
    </div>
  );
});

export default LeftLayout;
