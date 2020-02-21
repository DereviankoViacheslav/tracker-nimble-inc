import './InputCreateTracker.scss';
import React, { useState } from 'react';
import { addTracker } from '../../store/actions'
import store from '../../store'

function getNextTrackerNumber() {
  let nextTrackerNumber = 1;
  let isContains = false;
  do {
    const tracker = store.getState().trackerList
      .find(({ trackerNumber }) => trackerNumber === nextTrackerNumber);
    if (tracker) {
      nextTrackerNumber++;
      isContains = true;
    } else {
      isContains = false;
    }
  } while (isContains);
  return nextTrackerNumber;
}

function InputCreateTracker() {
  const [value, setValue] = useState('');

  function handleSubmit(event, value) {
    event.preventDefault();
    let trackerNumber = null;
    if (!value) {
      trackerNumber = getNextTrackerNumber();
      value = `No name tracker #${trackerNumber}`;
    }
    store.dispatch(addTracker(value, trackerNumber));
    setValue('');
  }

  return (
    <form
      className="tracker__creater"
      onSubmit={(event) => handleSubmit(event, value)}
    >
      <input
        type="text"
        className="tracker__creater-input"
        placeholder="Enter tracker name"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <button className="tracker__creater-btn"><i className="fas fa-play" /></button>
    </form>
  );
}

export default InputCreateTracker;