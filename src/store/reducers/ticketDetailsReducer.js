import {
  SET_REQUESTER_NAME,
  SET_CUSTOM_FIELD_NAME,
  GET_BOOKMARKED_USERS,
  SET_BOOKMARKED_USERS,
  SET_USER_BOOKMARK_STATUS
} from '../actions/types';

const initialState = {
  name: null,
  id: null,
  customFieldName: null,
  bookMarkedUsers: {},
  count: 0,
  isUserBookmarked: false
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
    case GET_BOOKMARKED_USERS:
      return {
        ...state,
        bookMarkedUsers: action.payload,
        count: action.count
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
        isUserBookmarked: action.payload
      };
    default:
      return state;
  }
}