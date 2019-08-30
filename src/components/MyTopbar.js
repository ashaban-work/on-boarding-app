import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import client from '../modules/client'

// to send user to the ticket clicked
// client.invoke('routeTo', 'ticket', 'new')

class MyTopbar extends Component {

  componentDidMount() {
    client.get("currentUser.id").then(res => {
      const id = res["currentUser.id"];
      client.request(`/api/v2/users/${id}.json`).then( data => {
        console.log(data.user['user_fields'].bookmarked_tickets)
      })
    })
  }

	render() {
		return (
			<div>
				<h2>SHIT IT DOESNT WORK</h2>
			</div>
		)
	}
}

MyTopbar.propTypes = {
  ticketDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ticketDetails: state.ticketDetails
});

export default connect(mapStateToProps, {})(MyTopbar);