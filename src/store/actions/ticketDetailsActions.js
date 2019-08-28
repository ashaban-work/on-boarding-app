import {
  SET_REQUESTER_NAME,
  SET_CUSTOM_FIELD_NAME,
  GET_BOOKMARKED_USERS,
  SET_BOOKMARKED_USERS,
  SET_USER_BOOKMARK_STATUS
} from './types'
import client from '../../modules/client'


export const getTicketRequester = ( bookMarkedUsers ) => dispatch => {
  client.get(['ticket.subject', 'ticket.requester.name', 'currentUser']).then(function(data) {
    dispatch({
      type: SET_REQUESTER_NAME,
      name: data['currentUser'].name,
      id: data['currentUser'].id
    })
  })
}

export const setUsername = (ticketDetails) => dispatch => {
  var {isUserBookmarked} = ticketDetails
  if ( isUserBookmarked ) {
    removeUserBookmark(ticketDetails, dispatch)
  }
  else {
    addUserBookmark(ticketDetails, dispatch)
  }
}

const addUserBookmark = (ticketDetails, dispatch) => {
  var { name, id, customFieldName, bookMarkedUsers, count } = ticketDetails
  var myObjAsString, usersObject
  if ( count == 0) {
    var myObject = {
      0: {
        name,
        id
      }
    }
    usersObject = myObject
    myObjAsString = JSON.stringify(myObject);
  }
  else {
    bookMarkedUsers[count] = {
      name,
      id
    }
    usersObject = bookMarkedUsers
    myObjAsString = JSON.stringify(bookMarkedUsers);
  }
  client.set('ticket.customField:'+ customFieldName, myObjAsString)
  count ++
  dispatch({
    type: SET_BOOKMARKED_USERS,
    payload: usersObject,
    count
  })
}

// 1:- REMOVE USER FROM THE OBJECT --------- DONE
// 2:- DECREMENT COUNT --------- DONE
// 3:- UPDATE THE CUSTOM FIELD
// 4:- UPDATE isUserBookmarked


const removeUserBookmark = (ticketDetails, dispatch) => {
  var { name, id, customFieldName, bookMarkedUsers, count } = ticketDetails



  const keys = Object.keys(bookMarkedUsers)
    for ( var key in keys ) {
      if ( id == bookMarkedUsers[key].id) {
        count--
        delete bookMarkedUsers[key]
        if ( count == 0 )
          client.set('ticket.customField:'+ customFieldName, '')
        else {
          client.set('ticket.customField:'+ customFieldName, bookMarkedUsers)
        }
        dispatch({
          type: SET_BOOKMARKED_USERS,
          payload: bookMarkedUsers,
          count
        })
        dispatch({
          type: SET_USER_BOOKMARK_STATUS,
          payload: false
        })
      }
    }
}

export const getCustomFieldName = () => dispatch => {
  client.get('ticketFields').then(function(data) {
    var field = 0
    for (; field < data['ticketFields'].length; field++ )
    {
      var label = data['ticketFields'][field].label
      if (label && label === 'Pinned By')
      {
        var name = data['ticketFields'][field].name
        getBookmarkedUsers(name, dispatch)
        dispatch({
          type: SET_CUSTOM_FIELD_NAME,
          payload: name
        })
      }
    }
  })
}

const getBookmarkedUsers = (customFieldName, dispatch) => {
  client.get( 'ticket.customField:'+ customFieldName ).then(function(data) {
    var myCustomFieldValue = JSON.parse(data['ticket.customField:custom_field_360021930571'])
    const bookmarkedUsers = Object.keys(myCustomFieldValue)
    dispatch({
      type: GET_BOOKMARKED_USERS,
      payload: myCustomFieldValue,
      count: bookmarkedUsers.length
    })
  })
}

export const isCurrentUserBookmarked = ( id, bookMarkedUsers, condition ) => dispatch => {
  if ( condition ) {
    return 0
  }
  else {
    const keys = Object.keys(bookMarkedUsers)
    for ( var [key, value] of Object.entries(bookMarkedUsers) ) {
      console.log(key)
      if ( id == bookMarkedUsers[key].id)
      dispatch({
        type: SET_USER_BOOKMARK_STATUS,
        payload: true
      })
    }
  }
}

// for (const [key, value] of Object.entries(obj)) {
//   console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
// }