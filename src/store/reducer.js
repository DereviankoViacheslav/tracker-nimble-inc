import { ADD_TRACKER, DELETE_TRACKER, TOGGLE_TRACKER_STATUS } from './actions'
import moment from 'moment';

const initialState = {
  trackerList: [
    {
      id: 'id-0',
      trackerNumber: 1,
      name: 'No name tracker #1',
      creationDate: moment('2020-02-20'),
      duration: moment.duration(0, 'seconds'),
      isActive: true,
    },
    {
      id: 'id-1',
      trackerNumber: 2,
      name: 'No name tracker #2',
      creationDate: moment('2020-02-19'),
      duration: moment.duration(0, 'seconds'),
      isActive: false,
    },
    {
      id: 'id-2',
      trackerNumber: null,
      name: '3 Tracker with long name',
      creationDate: moment('2020-02-18'),
      duration: moment.duration(0, 'seconds'),
      isActive: false,
    },
  ]
};

export default function reduser(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACKER:
      return {
        ...state,
        trackerList: [...state.trackerList, action.payload]
      };
    case DELETE_TRACKER:
      return {
        ...state,
        trackerList: state.trackerList.filter(({ id }) => id !== action.payload)
      };
    case TOGGLE_TRACKER_STATUS:
      const tracker = state.trackerList.find(({ id }) => id === action.payload);
      const newTrackerList = state.trackerList.filter(({ id }) => id !== action.payload);
      return {
        ...state,
        trackerList: newTrackerList.concat({ ...tracker, isActive: !tracker.isActive })
      };
    default:
      return state;
  }
}