import React from 'react';
import './todoInput.css';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.todoText};

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  addTodo(todo) {
    if (todo.length > 0) {
      this.props.addTodo(todo);
      this.setState({value: ''});
    }
	}
	
	activeTododay(id) {
		this.props.activeId(id);
		
}

  render() {
    return (
<div className = "to-do-input grid">
<input className ="input grid" 
	type = "text"
	placeholder = "Введите задание" 
	value = {this.state.value}
	onChange={this.handleChange}
/>
<button className = "buttons grid" onClick={() => this.addTodo(this.state.value)} >Добавить</button>
</div>
    );
  }
}
