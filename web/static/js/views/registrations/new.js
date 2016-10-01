import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { setDocumentTitle, renderErrorsFor } from '../../utils'
import Actions from '../../actions/registrations'

class RegistrationsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign up')
  }

  handleSubmit(e) {
    e.preventDefault()

    const { dispatch } = this.props

    /* eslint-disable camelcase */
    /* eslint-disable react/no-string-refs */
    const data = {
      first_name: this.refs.firstName.value,
      last_name: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    }

    /* eslint-enable camelcase */
    /* eslint-disable react/no-string-refs */

    dispatch(Actions.signUp(data))
  }

  render() {
    const { errors } = this.props

    /* eslint-disable max-len */
    return (
      <div className="view-container registrations new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this.handleSubmit}>
            <div className="field">
              <input ref="firstName" type="text" placeholder="First name" required />
              {renderErrorsFor(errors, 'first_name')}
            </div>
            <div className="field">
              <input ref="lastName" type="text" placeholder="Last name" required />
              {renderErrorsFor(errors, 'last_name')}
            </div>
            <div className="field">
              <input ref="email" type="email" placeholder="Email" required />
              {renderErrorsFor(errors, 'email')}
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required />
              {renderErrorsFor(errors, 'password')}
            </div>
            <div className="field">
              <input ref="passwordConfirmation" type="password" placeholder="Confirm password" required />
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/sign_in">Sign in</Link>
        </main>
      </div>
    )

    /* eslint-enable max-len */
  }
}

const mapStateToProps = state => ({
  errors: state.registration.errors,
})

export default connect(mapStateToProps)(RegistrationsNew)
