import React from 'react';
import ContextFilterState from './context/ContextFilterState'
import List from './components/List'

const App = () => {
  return (
    <ContextFilterState>
      <List />
    </ContextFilterState>
  );
};

export default App;
