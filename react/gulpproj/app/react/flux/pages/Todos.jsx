import React from "react"

import Todo from "../components/Todo.jsx"
import * as TodoActions from "../actions/todo"
import TodoStore from "../stores/todo"


export default class Featured extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: TodoStore.getAll(),
    }
    this.getTodos = this.getTodos.bind(this)
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos)
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos)
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    })
  }

  reloadTodos() {
    TodoActions.reloadTodos()
  }

  render() {
    const { todos } = this.state

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>
    })

    return (
      <div>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    )
  }
}
