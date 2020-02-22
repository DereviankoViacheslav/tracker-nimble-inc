import { ADD_TRACKER, DELETE_TRACKER, CHANGE_TRACKER_STATUS } from './actions'
import { getItem, setItem } from '../services/storage';

const initialState = {
  trackerList: getItem('trackerList') || [],
};

export default function reduser(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACKER:
      setItem('trackerList', [...state.trackerList, action.payload]);
      return {
        ...state,
        trackerList: [...state.trackerList, action.payload]
      };
    case DELETE_TRACKER:
      setItem('trackerList', [...state.trackerList.filter(({ id }) => id !== action.payload)]);
      return {
        ...state,
        trackerList: state.trackerList.filter(({ id }) => id !== action.payload)
      };
    case CHANGE_TRACKER_STATUS:
      const { trackerId, isActive, duration } = action.payload;
      const tracker = { ...state.trackerList.find(({ id }) => id === trackerId) };
      const newTrackerList = state.trackerList.filter(({ id }) => id !== trackerId);
      const newTracker = {
        ...tracker,
        isActive,
        duration,
      };
      setItem('trackerList', [...newTrackerList.concat({ ...newTracker })]);
      return {
        ...state,
        trackerList: newTrackerList.concat({ ...newTracker })
      };
    default:
      return state;
  }
}