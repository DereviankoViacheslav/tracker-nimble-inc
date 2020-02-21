import './TrackerList.scss';
import React, { useState, useEffect } from 'react';
import TrackerItem from '../trackerItem';
import store from '../../store';

function TrackerList() {
  const [trackerList, setTrackerList] = useState(store.getState().trackerList);

  useEffect(() => {
    store.subscribe(() => {
      setTrackerList(store.getState().trackerList);
    });
  });

  const trackers = trackerList
    .sort((a, b) => b.creationDate - a.creationDate)
    .map((tracker) => {
      const trackerClone = { ...tracker, duration: tracker.duration.clone() }
      return (
        <TrackerItem key={tracker.id} {...trackerClone} />
      );
    });

  return (
    <ul className="tracker__list">{trackers}</ul>
  );
}

export default TrackerList;