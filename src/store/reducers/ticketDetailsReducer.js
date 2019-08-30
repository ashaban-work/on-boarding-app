import {
  SET_REQUESTER_NAME,
  SET_CUSTOM_FIELD_NAME,
  SET_BOOKMARKED_USERS,
  SET_USER_BOOKMARK_STATUS,
  SET_TOPBAR_GUID,
  SET_BOOKMARKED_TICKETS
} from '../actions/types';

const initialState = {
  name: null,
  id: null,
  customFieldName: null,
  bookMarkedUsers: {},
  count: 0,
  isUserBookmarked: false,
  topbarGuid: null,
  bookMarkedTickets: {}
};

// Set the state based on the action dispatched
export default function(state = initialState, action) {
  switch(action.type) {
    // Set the attributes and clear the error
    case SET_REQUESTER_NAME:
      return {
        ...state,
        name: action.name,
        id: action.id
      };
    case SET_CUSTOM_FIELD_NAME:
      return {
        ...state,
        customFieldName: action.payload
      };
    case SET_BOOKMARKED_USERS:
      return {
        ...state,
        bookMarkedUsers: action.payload,
        count: action.count
      };
    case SET_USER_BOOKMARK_STATUS:
      return {
        ...state,
        isUserBookmarked: action.isUserBookmarked
      };
    case SET_TOPBAR_GUID:
      return {
        ...state,
        topbarGuid: action.topbarGuid
      };
    case SET_BOOKMARKED_TICKETS:
      return {
        ...state,
        bookMarkedTickets: action.bookMarkedTickets
      };
    default:
      return state;
  }
}