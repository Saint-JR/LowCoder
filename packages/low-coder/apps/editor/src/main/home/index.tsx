import { memo } from 'react';

import Sandbox from '../../core/sandbox/sandbox';
import CenterLayout from '../layout/CenterLayout';
import LeftLayout from '../layout/LeftLayout';
import RightLayout from '../layout/RightLayout';
import TopLayout from '../layout/TopLayout';
import ConfigPanel from '../section/ConfigPanel';
import MaterialList from '../section/MaterialList';

const Home = memo(() => {
  return (
    <div className="low-coder__home flex flex-col w-full h-full items-stretch">
      <TopLayout />
      <div className="flex-1 flex items-stretch">
        <LeftLayout buttons={<div>123</div>} content={<MaterialList />} />
        <CenterLayout>
          <div className="w-full h-full">
            <Sandbox />
          </div>
        </CenterLayout>
        <RightLayout>
          <ConfigPanel />
        </RightLayout>
      </div>
    </div>
  );
});

export default Home;
