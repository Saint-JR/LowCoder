import { memo, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const CenterLayout = memo((props: Props) => {
  return (
    <div className="w-full h-full flex-1 bg-white p-[15px]">
      {props.children}
    </div>
  );
});

export default CenterLayout;
