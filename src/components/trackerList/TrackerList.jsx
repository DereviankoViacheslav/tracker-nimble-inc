import './TrackerList.scss';
import React from 'react';
import { connect } from 'react-redux';
import TrackerItem from '../trackerItem';

function TrackerList(props) {
  const trackers = props.trackerList
    .sort((a, b) => b.creationDate - a.creationDate)
    .map((tracker) => {
      const trackerClone = { ...tracker, duration: tracker.duration.clone() }
      return <TrackerItem key={tracker.id} {...trackerClone} />;
    });

  return (
    <ul className="tracker__list">{trackers}</ul>
  );
}

function mapState(state) {
  return {
    trackerList: state.trackerList
  };
}

export default connect(mapState)(TrackerList);