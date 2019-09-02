import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import topbarReducer from './topbarReducer';

export default combineReducers({
  ticketDetails: sidebarReducer,
  userDetails: topbarReducer
});