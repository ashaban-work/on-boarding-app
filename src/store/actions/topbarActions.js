import {
    SET_BOOKMARKED_TICKETS
} from './types'
import client from '../../modules/client'

export const fetchBookmarkedTickets = () => dispatch => {
  client.get("currentUser.id").then(res => {
    const userId = res["currentUser.id"];
    client.request(`/api/v2/users/${userId}.json`).then( data => {
      const ticketsObject = JSON.parse(data.user['user_fields'].bookmarked_tickets)
      dispatch({
        type: SET_BOOKMARKED_TICKETS,
        bookMarkedTickets: ticketsObject,
        userId: userId
      })
    })
  })
}

export const openTicket = (ticketId) => dispatch => {
  client.invoke('routeTo', 'ticket', ticketId )
}