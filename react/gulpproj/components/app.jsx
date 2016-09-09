import React     from 'react'
import ReactDOM  from 'react-dom'
//import React     from '../lib/react.min.js'
//import ReactDOM  from '../lib/react-dom.js'

import Header    from './layouts/header.jsx'
import Footer    from './layouts/footer.jsx'
import MemoBox   from './memos/memo_box.jsx'
import MemoBox2  from './memos/memo_box2.jsx'
import Timer     from './timer/timer.jsx'
import Counter   from './counter/counter.jsx'
import NewsBox   from './news/news.jsx'

var memoData = [
  {id:1, language: "Golang", rank: 1},
  {id:2, language: "Python", rank: 2},
  {id:3, language: "Javascript", rank: 3}
]

export default class App extends React.Component {
  render() {
    return (
      <div className='contents'>
        <Header />
        <br/>  
        <Timer />
        <br/>  
        <MemoBox />
        <br/>  
        <NewsBox url="/json/news" pollInterval={10000} />
        <br/>
        <Counter />
        <br/>
        <MemoBox2 data={memoData} />
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
