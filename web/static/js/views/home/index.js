import React from 'react'

export default class HomeIndexView extends React.Component {
  render() {
    return (
      <div>
        <h1>HomeIndexView</h1>
        {this.props.children}
      </div>
    )
  }
}
