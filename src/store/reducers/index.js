import { combineReducers } from 'redux';
import ticketDetailsReducer from './ticketDetailsReducer';

export default combineReducers({
  ticketDetails: ticketDetailsReducer
});