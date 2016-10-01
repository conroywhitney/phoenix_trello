import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'
import Actions from '../actions/registrations'

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch, _currentUser } = this.props

    if (localStorage.getItem('phoenixAuthToken')) {
      dispatch(Actions.currentUser())
    } else {
      dispatch(routeActions.push('/sign_up'))
    }
  }

  render() {
    return <h1>AuthenticatedContainer</h1>
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
})

export default connect(mapStateToProps)(AuthenticatedContainer)
