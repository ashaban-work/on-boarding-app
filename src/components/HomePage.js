import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Button } from '@zendeskgarden/react-buttons';
import {
  getTicketRequester,
  setUsername,
  getCustomFieldName,
  isCurrentUserBookmarked
} from '../store/actions/ticketDetailsActions'

class HomePage extends Component {

	componentDidMount() {
    this.props.getTicketRequester()
    this.props.getCustomFieldName()
  }

  bookmarkHandler() {
    this.props.setUsername(this.props.ticketDetails)
  }

  displayBookmark() {
    var { id, bookMarkedUsers, isUserBookmarked } = this.props.ticketDetails
    this.props.isCurrentUserBookmarked(id, bookMarkedUsers, isUserBookmarked )
    if ( isUserBookmarked ) {
      return (
        <div>
          <Button onClick={() => {this.bookmarkHandler()}} > 📌 Remove Bookmark</Button>
        </div>
      )
    }
    else {
      return (
        <Button onClick={() => {this.bookmarkHandler()}} > 📌 Bookmark</Button>
      )
    }
  }

	render() {
    const myButton = this.displayBookmark()
		return (
			<div>
				<h2>{this.props.ticketDetails.name}</h2>
        {myButton}
			</div>
		)
	}
}

HomePage.propTypes = {
  getTicketRequester: PropTypes.func.isRequired,
  getCustomFieldName: PropTypes.func.isRequired,
  isCurrentUserBookmarked: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  ticketDetails: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ticketDetails: state.ticketDetails
});

export default connect(mapStateToProps, {
  getTicketRequester,
  setUsername,
  getCustomFieldName,
  isCurrentUserBookmarked
})(HomePage);