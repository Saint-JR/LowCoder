import { memo } from 'react';

export interface RightLayoutProps {
  children: React.ReactNode;
}

const RightLayout = memo((props: RightLayoutProps) => {
  const { children } = props;

  return (
    <div className="w-[400px] h-full bg-white border-l-[1px] border-solid border-[var(--low-coder-border-gray)]">
      {children}
    </div>
  );
});

export default RightLayout;
