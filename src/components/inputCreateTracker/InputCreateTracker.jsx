import './InputCreateTracker.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

function getNextTrackerNumber(trackerList) {
  let nextTrackerNumber = 1;
  let isContains = false;
  do {
    const tracker = trackerList
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

function InputCreateTracker(props) {
  const [trackerName, setTrackerName] = useState('');

  function handleSubmit(event, trackerName) {
    event.preventDefault();
    let trackerNumber = null;
    if (!trackerName) {
      trackerNumber = getNextTrackerNumber(props.trackerList);
      trackerName = `No name tracker #${trackerNumber}`;
    }
    props.addTracker(trackerName, trackerNumber);
    setTrackerName('');
  }

  return (
    <form
      className="tracker__creater"
      onSubmit={(event) => handleSubmit(event, trackerName)}
    >
      <input
        type="text"
        className="tracker__creater-input"
        placeholder="Enter tracker name"
        onChange={(event) => setTrackerName(event.target.value)}
        value={trackerName}
      />
      <button className="tracker__creater-btn">
        <i className="material-icons">play_arrow</i>
      </button>
    </form>
  );
}

function mapState(state) {
  return {
    trackerList: state.trackerList
  };
}

const mapDispatch = {
  addTracker: actions.addTracker
};

export default connect(mapState, mapDispatch)(InputCreateTracker);