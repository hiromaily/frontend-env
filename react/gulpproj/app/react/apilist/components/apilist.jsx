import React     from 'react'
import ReactDOM  from 'react-dom'

export default class App extends React.Component {
  render() {
    return (
      <div className='contents'>
        <p>apilist</p>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
