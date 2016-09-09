import React from 'react'
//import ReactDOM from 'react-dom'
//import React     from '../../lib/react.min.js'

export default class Message2 extends React.Component {
  render() {
    return (
      <p>{this.props.data.rank} / language:{this.props.data.language}</p>
    )
  }
}


