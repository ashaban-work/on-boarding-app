import { combineReducers } from 'redux';
import ticketDetailsReducer from './ticketDetailsReducer';
import topbarReducer from './topbarReducer';

export default combineReducers({
  ticketDetails: ticketDetailsReducer,
  userDetails: topbarReducer
});