import './TrackerItem.scss';
import React from 'react';
import { deleteTracker, toggleTrackerStatus } from '../../store/actions'
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

function TrackerItem(props) {

  const icon = props.isActive
    ? <i className="material-icons">pause_circle_outline</i>
    : <i className="material-icons">play_circle_outline</i>;

  const classActive = props.isActive ? ' tracker__item_active' : '';

  return (
    <li className={`tracker__item${classActive}`}>
      <span className="tracker__item-text">{props.name}</span>
      <div className="tracker__item-controler">
        <span className="tracker__item-time">{getTimeToString(props.duration)}</span>
        <button
          className="tracker__item-btn"
          onClick={() => store.dispatch(toggleTrackerStatus(props.id))}
        >
          {icon}
        </button>
        <button
          className="tracker__item-btn"
          onClick={() => store.dispatch(deleteTracker(props.id))}
        >
          <i className="material-icons">remove_circle_outline</i>
        </button>
      </div>
    </li>
  );
}

export default TrackerItem;