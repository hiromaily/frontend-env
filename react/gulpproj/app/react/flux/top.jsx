import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"

import Favorites from "./pages/Favorites.jsx"
import Todos from "./pages/Todos.jsx"
import Layout from "./pages/Layout.jsx"
import Settings from "./pages/Settings.jsx"

export default class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Todos}></IndexRoute>
          <Route path="favorites" component={Favorites}></Route>
          <Route path="settings" component={Settings}></Route>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
