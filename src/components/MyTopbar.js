import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@zendeskgarden/react-buttons';
import {
  fetchBookmarkedTickets,
  openTicket
} from '../store/actions/topbarActions'

class MyTopbar extends Component {

  componentDidMount() {
    this.props.fetchBookmarkedTickets()
  }

  ticketEventHandler(ticketId) {
    this.props.openTicket(ticketId)
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
            <Button data-value={key} onClick={(e) => {this.ticketEventHandler(e.target.dataset.value)}} >
              Open Ticket
            </Button>
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
  openTicket: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userDetails: state.userDetails
});

export default connect(mapStateToProps, {
  fetchBookmarkedTickets,
  openTicket
})(MyTopbar);