import React from 'react'

export default class BoardsShowView extends React.Component {
  render() {
    return (
      <div>
        <h1>BoardsShowView</h1>
        {this.props.children}
      </div>
    )
  }
}
