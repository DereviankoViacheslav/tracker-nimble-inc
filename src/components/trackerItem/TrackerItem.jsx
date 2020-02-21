import './TrackerItem.scss';
import React, { useState, useEffect, useRef } from 'react';
import { deleteTracker, changeTrackerStatus } from '../../store/actions'
import store from '../../store'

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

function TrackerItem({ id, name, duration, isActive }) {
  const [timer, setTimer] = useState(getTimeToString(duration));
  const [status, setStatus] = useState(isActive);

  const intervalRef = useRef();

  useEffect(() => {
    if (status) {
      intervalRef.current = setInterval(() => {
        setTimer(getTimeToString(duration.add(1, 's')));
      }, 1000);
    }

    return () => {
      // store.dispatch(changeTrackerStatus(id, status, duration));
      clearInterval(intervalRef.current);
    }
  });

  function handlerClickOnButtonStop() {
    store.dispatch(changeTrackerStatus(id, !status, duration));
    setStatus(!status);
  }

  const icon = status
    ? <i className="material-icons">pause_circle_outline</i>
    : <i className="material-icons">play_circle_outline</i>;

  const classActive = status ? ' tracker__item_active' : '';

  return (
    <li className={`tracker__item${classActive}`}>
      <span className="tracker__item-text">{name}</span>
      <div className="tracker__item-controler">
        <span className="tracker__item-time">{timer}</span>
        <button
          className="tracker__item-btn"
          onClick={handlerClickOnButtonStop}
        >
          {icon}
        </button>
        <button
          className="tracker__item-btn"
          onClick={() => store.dispatch(deleteTracker(id))}
        >
          <i className="material-icons">remove_circle_outline</i>
        </button>
      </div>
    </li>
  );
}

export default TrackerItem;