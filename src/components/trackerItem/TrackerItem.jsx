import './TrackerItem.scss';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const ONE_DAY = 1000 * 60 * 60 * 24;

function getTimeToString(duration) {
  const days = Math.trunc(duration._milliseconds / ONE_DAY);
  const hours = duration.hours() + (days * 24);
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${
    hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds}`;
}

function TrackerItem(props) {
  const { id, name, duration, isActive, changeTrackerStatus, deleteTracker } = props;
  const [timer, setTimer] = useState(getTimeToString(duration));

  const intervalRef = useRef();

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        // changeTrackerStatus(id, isActive, duration);
        setTimer(getTimeToString(duration.add(1, 's')));
      }, 1000);
    }

    return () => {
      // changeTrackerStatus(id, !isActive, duration);
      clearInterval(intervalRef.current);
    }
  });

  function handlerClickOnButtonPlayStop() {
    changeTrackerStatus(id, !isActive, duration);
  }

  const icon = isActive
    ? <i className="material-icons">pause_circle_outline</i>
    : <i className="material-icons">play_circle_outline</i>;

  const classActive = isActive ? ' tracker__item_active' : '';

  return (
    <li className={`tracker__item${classActive}`}>
      <span className="tracker__item-text">{name}</span>
      <div className="tracker__item-controler">
        <span className="tracker__item-time">{timer}</span>
        <button
          className="tracker__item-btn"
          onClick={handlerClickOnButtonPlayStop}
        >
          {icon}
        </button>
        <button
          className="tracker__item-btn"
          onClick={() => deleteTracker(id)}
        >
          <i className="material-icons">remove_circle_outline</i>
        </button>
      </div>
    </li>
  );
}

// function mapState(state) {
//   return {
//     trackerList: state.trackerList
//   };
// }

const mapDispatch = {
  deleteTracker: actions.deleteTracker,
  changeTrackerStatus: actions.changeTrackerStatus,
};

export default connect(null, mapDispatch)(TrackerItem);