import React     from 'react'
import ReactDOM  from 'react-dom'
//import $ from 'jquery'

import Ajax   from './components/ajax/parent.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div className='contents'>
        <Ajax />
        <br/>  
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
