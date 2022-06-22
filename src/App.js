import React, {Component} from 'react';
import './App.css';
import Bin from './trash2.svg';
import Add from './plus-lg.svg';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: null
    };

    // This binding is necessary to make `this` work in the callback
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount(){
    this.setState({
      todos: JSON.parse(localStorage.getItem('l0calT0d0s'))
    });
  }

  addTodo() {
    let uniqueId = localStorage.getItem('t0d0id');
    if (uniqueId === null) {
      uniqueId = localStorage.setItem('t0d0id', 0);
      uniqueId = parseInt(localStorage.getItem('t0d0id'));
    } else {
      uniqueId = parseInt(localStorage.getItem('t0d0id'));
      uniqueId++;
    }

    let input = prompt(`Enter todo, press ok. Otherwise press cancel.`);

    if (input === null) {
      console.log('input cancelled');
    } else {
      const newTodo = {
        todo: input,
        todoid: uniqueId
      }
      if (this.state.todos === null) {
        this.setState({
          todos: [newTodo]
        });
      } else {
        this.setState({
          todos: [...this.state.todos, newTodo]
        });
      }
    }
    localStorage.setItem('t0d0id', uniqueId);
  }

  deleteTodo(param){
    let todos = this.state.todos;
    let todoId = param.slice(3);
    const TodoIndex = todos.findIndex(todo => {
      return todo.todoid === parseInt(todoId);
    });
    todos.splice(TodoIndex, 1);
    localStorage.setItem('l0calT0d0s', JSON.stringify(todos));
    this.setState({
      todos: JSON.parse(localStorage.getItem('l0calT0d0s'))
    });
  }

  render() {
    console.log(this.state.todos);
    const todos = this.state.todos;
    let todolist;

    if (todos) {
      todolist = 
      <ul className="todos">
        {todos.map((todo) => {
          return(
          <li key={'todo'+ todo.todoid} id={'todo'+ todo.todoid}>
            {todo.todo} &nbsp;
            <img 
              className="bin" 
              id={'bin' + todo.todoid} 
              src={Bin} 
              onClick={() => this.deleteTodo('bin' + todo.todoid)}
              alt='bin' 
            />
          </li>)
        })}
      </ul>;
      localStorage.setItem('l0calT0d0s', JSON.stringify(this.state.todos));
    } else {
      todolist = 
      <ul className="todos">
        <li>Hello World 😎</li>
      </ul>;
    }

    return (
      <div className="container">
        <h1>Todos</h1>
        <button id="add" onClick={this.addTodo}>
          <img className="plus" src={Add} alt='add' />
        </button>
        {todolist}
      </div>
    );
  }
}

export default AppContainer;