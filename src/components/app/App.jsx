import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store'
import InputCreateTracker from '../inputCreateTracker';
import TrackerList from '../trackerList';

function App() {
  return (
    <Provider store={store}>
      <div className="tracker">
        <h1 className="tracker__header">tracker</h1>
        <InputCreateTracker />
        <TrackerList />
      </div>
    </Provider>
  );
}

export default App;