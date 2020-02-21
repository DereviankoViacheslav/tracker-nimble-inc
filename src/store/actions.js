import moment from 'moment';

export const ADD_TRACKER = 'ADD_TRACKER';
export const DELETE_TRACKER = 'DELETE_TRACKER';
export const TOGGLE_TRACKER_STATUS = 'TOGGLE_TRACKER_STATUS';

export function addTracker(name, trackerNumber) {
  return {
    type: ADD_TRACKER,
    payload: {
      id: `${moment().valueOf()}`,
      trackerNumber,
      name,
      creationDate: moment(),
      duration: moment.duration(0, 'seconds'),
      isActive: true,
    }
  };
};

export function deleteTracker(trackerId) {
  return {
    type: DELETE_TRACKER,
    payload: trackerId
  };
};

export function toggleTrackerStatus(trackerId) {
  return {
    type: TOGGLE_TRACKER_STATUS,
    payload: trackerId
  };
};