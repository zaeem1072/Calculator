import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PaperCalculator } from './components/PaperCalculator';
import './App.css';

const App: React.FC = () => {
  const appStyle: React.CSSProperties = {
    backgroundColor: "white",
    minHeight: '100vh',  };

  return (
    <Provider store={store}>
      <div style={appStyle}>
        <PaperCalculator />
      </div>
    </Provider>
  );
};

export default App;
