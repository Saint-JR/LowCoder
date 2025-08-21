import { memo } from 'react';

import RuntimeRoot from './renderer/RuntimeRoot';

const App = memo(() => {
  return <RuntimeRoot />;
});

export default App;
