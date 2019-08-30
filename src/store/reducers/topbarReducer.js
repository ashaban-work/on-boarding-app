import {
    SET_BOOKMARKED_TICKETS
  } from '../actions/types';

  const initialState = {
    userId: null,
    count: 0,
    bookMarkedTickets: {}
  };

  // Set the state based on the action dispatched
  export default function(state = initialState, action) {
    switch(action.type) {
      // Set the attributes and clear the error
      case SET_BOOKMARKED_TICKETS:
        return {
          ...state,
          bookMarkedTickets: action.bookMarkedTickets,
          userId: action.userId
        };
      default:
        return state;
    }
  }