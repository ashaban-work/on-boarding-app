import {
  SET_REQUESTER_NAME,
  SET_CUSTOM_FIELD_NAME,
  SET_BOOKMARKED_USERS,
  SET_USER_BOOKMARK_STATUS,
  SET_TOPBAR_GUID,
  SET_BOOKMARKED_TICKETS
} from './types'
import client from '../../modules/client'


export const getTicketRequester = () => dispatch => {
  client.get(['ticket.subject', 'ticket.requester.name', 'currentUser']).then(function(data) {
    dispatch({
      type: SET_REQUESTER_NAME,
      name: data['currentUser'].name,
      id: data['currentUser'].id
    })
  })
}

const addTicketToUser = (ticketDetails) => {
  const { id, bookMarkedTickets } = ticketDetails
  client.get(['ticket.id', 'ticket.subject']).then( (data) => {
    var ticketSubject = data['ticket.subject']
    var ticketId = data['ticket.id']
    bookMarkedTickets[ticketId] = {
      ticketSubject
    }
    var myObjAsString = JSON.stringify(bookMarkedTickets);
    client.request({
      url: `/api/v2/users/${id}.json`,
      type: "put",
      data: {
        user: {
          user_fields: {
            bookmarked_tickets: myObjAsString
          }
        }
      },
      httpCompleteResponse: true
    })
  })
}

const removeTicketFromUser = (ticketDetails) => {
  const { id, bookMarkedTickets } = ticketDetails
  client.get(['ticket.id', 'ticket.subject']).then( (data) => {
    var ticketSubject = data['ticket.subject']
    var ticketId = data['ticket.id']
    delete bookMarkedTickets[ticketId]
    var myObjAsString = JSON.stringify(bookMarkedTickets);
    client.request({
      url: `/api/v2/users/${id}.json`,
      type: "put",
      data: {
        user: {
          user_fields: {
            bookmarked_tickets: myObjAsString
          }
        }
      },
      httpCompleteResponse: true
    })
  })
}

export const setUsername = (ticketDetails) => dispatch => {
  var {isUserBookmarked} = ticketDetails
  if ( isUserBookmarked ) {
    removeTicketFromUser(ticketDetails)
    removeUserBookmark(ticketDetails, dispatch)
  }
  else {
    addTicketToUser(ticketDetails)
    addUserBookmark(ticketDetails, dispatch)
  }
}

const addUserBookmark = (ticketDetails, dispatch) => {
  var { name, id, customFieldName, bookMarkedUsers, count } = ticketDetails
  var myObjAsString, usersObject
  if ( count == 0) {
    usersObject = {
      [id]: {
        name
      }
    }
    myObjAsString = JSON.stringify(usersObject);
  }
  else {
    bookMarkedUsers[id] = {
      name
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

const removeUserBookmark = (ticketDetails, dispatch) => {
  var { id, customFieldName, bookMarkedUsers, count } = ticketDetails
    for ( var [key, value] of Object.entries(bookMarkedUsers) ) {
      if ( id == key ) {
        count--
        delete bookMarkedUsers[key]
        var myObjAsString = JSON.stringify(bookMarkedUsers);
        if ( count == 0 )
          client.set('ticket.customField:'+ customFieldName, '')
        else {
          client.set('ticket.customField:'+ customFieldName, myObjAsString)
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
    var myCustomFieldValue = JSON.parse(data[('ticket.customField:'+ customFieldName)])
    const bookmarkedUsers = Object.keys(myCustomFieldValue)
    dispatch({
      type: SET_BOOKMARKED_USERS,
      payload: myCustomFieldValue,
      count: bookmarkedUsers.length
    })
  })
}

export const isCurrentUserBookmarked = ( id, bookMarkedUsers, isUserBookmarked ) => dispatch => {
  if ( isUserBookmarked ) {
    return 0
  }
  else {
    for ( var [key, value] of Object.entries(bookMarkedUsers) ) {
      if ( id == key )
      dispatch({
        type: SET_USER_BOOKMARK_STATUS,
        isUserBookmarked: true
      })
    }
  }
}

export const setBookmarkedTickets = () => dispatch => {
  client.get("currentUser.id").then(res => {
    const id = res["currentUser.id"];
    client.request(`/api/v2/users/${id}.json`).then( data => {
      const loadedTickets = JSON.parse(data.user['user_fields'].bookmarked_tickets)
      if ( loadedTickets ) {
        dispatch({
          type: SET_BOOKMARKED_TICKETS,
          bookMarkedTickets: loadedTickets
        })
      }
    })
  })
}

export const getTopbarGuid = () => dispatch => {
  client.get("instances")
  .then(function(instancesData) {
    var instances = instancesData.instances
    for (let instanceGuid in instances) {
      if (instances[instanceGuid].location === "top_bar") {
        dispatch({
          type: SET_TOPBAR_GUID,
          topbarGuid: instanceGuid
        })
      }
    }
  }).catch(error => console.log("error", error))
}

/*
var topBarClientPromise = client
.get("instances")
.then(function(instancesData) {
  var instances = instancesData.instances;
  for (let instanceGuid in instances) {
    if (instances[instanceGuid].location === "top_bar") {
      return client.instance(instanceGuid);
    }
  }
}).catch(error => console.log("error", error))
;
 */
