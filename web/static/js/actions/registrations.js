import { pushPath } from 'redux-simple-router'
import Constants from '../constants'
import { httpPost } from '../utils'

const Actions = {}

// eslint-disable-next-line no-console
Actions.currentUser = () => console.log('Actions.currentUser not implemented')

Actions.signUp = data =>
  dispatch => {
    httpPost('/api/v1/registrations', { user: data })
      .then(response => {
        localStorage.setItem('phoenixAuthToken', response.jwt)

        dispatch({
          type: Constants.CURRENT_USER,
          currentUser: data.user,
        })

        dispatch(pushPath('/'))
      })
      .catch(error => {
        error.response.json()
        .then(errorJSON => {
          dispatch({
            type: Constants.REGISTRATIONS_ERROR,
            errors: errorJSON.errors,
          })
        })
      })
  }

export default Actions
