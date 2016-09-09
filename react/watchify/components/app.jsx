import React     from 'react'
import ReactDOM  from 'react-dom'
import Header    from './layouts/header.jsx'
import Footer    from './layouts/footer.jsx'
import MemoBox   from './memos/memo_box.jsx'
import Counter   from './counter/counter.jsx'


export default class App extends React.Component {
  render() {
    return (
      <div className='contents'>
        <Header />
        <br/>  
        <MemoBox />
        <br/>  
        <Counter />
        <br/>  
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
