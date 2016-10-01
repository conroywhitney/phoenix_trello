import React from 'react'

export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <h1>Main Layout</h1>
        {this.props.children}
      </div>
    )
  }
}
