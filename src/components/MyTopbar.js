import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchBookmarkedTickets
} from '../store/actions/topbarActions'

// to send user to the ticket clicked
// client.invoke('routeTo', 'ticket', 'new')

class MyTopbar extends Component {

  componentDidMount() {
    this.props.fetchBookmarkedTickets()
  }

  displayTickets() {
    const myTickets = this.props.userDetails.bookMarkedTickets
    let ticketList = []
    if ( myTickets ) {
      for ( var [key, value] of Object.entries(myTickets) ) {
        ticketList.push(
          <li key={key} >
            <p>Ticket ID = {key}</p>
            <p>Ticket Subject = {value.ticketSubject}</p>
          </li>
        )
      }
      return ticketList
    }
  }

	render() {
    const ticketList = this.displayTickets()
		return (
			<div>
				<ul>{ticketList}</ul>
			</div>
		)
	}
}

MyTopbar.propTypes = {
  fetchBookmarkedTickets: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userDetails: state.userDetails
});

export default connect(mapStateToProps, {fetchBookmarkedTickets})(MyTopbar);