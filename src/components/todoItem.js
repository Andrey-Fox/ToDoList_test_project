import React from 'react';
import './todoItem.css';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			value: this.props.todo.text
		};

		this.handleChange = this.handleChange.bind(this);
		this.apdateTodoText = this.apdateTodoText.bind(this);
	}

	removeTodo(id) {
		this.props.removeTodo(id);
	}

	goToEditMode() {
		this.setState({
			editMode: true
		});
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	apdateTodoText(newText) {
		this.props.apdateTodoText({
			newText:this.state.value,
			activeDay:this.props.todo.activeDay,
			id:this.props.todo.id
		});

		this.setState({
			editMode: false
		});
	}

	render() {
		let {text} = this.props.todo;
		let displayElement = "";

		if(this.state.editMode){
			displayElement = ( 
						<input autoFocus
							className ="item grid" 
							type="text"
							placeholder="Введите новое значение" 
							value={this.state.value}
							onChange={this.handleChange}  
							onBlur={() => this.apdateTodoText(this.props)} />
			);
		}else{
			displayElement = ( <div onDoubleClick={this.goToEditMode.bind(this)}>{text}</div>
			);
		}

		return (
			<div className="to-do-list grid">
				{displayElement} 
				<button className="buttons btn" 
					onClick={(e) => this.removeTodo(this.props.id)}>Удалить
				</button>
			</div>
		);
	}
}
