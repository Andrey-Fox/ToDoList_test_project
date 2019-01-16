import React from 'react';
import './tododays.css';

export default class Tododays extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			value: this.props.tododay.days
		};

		this.handleChange = this.handleChange.bind(this);
		this.apdateName = this.apdateName.bind(this);
	}

	addTododay(todo) {
		this.props.addtododays(todo);
	}

	activeTododay(todo) {
		this.props.toDoDaysActive(todo);
	}
		
	removeTododay(id) {
		this.props.removeTododay(id);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	goToEditMode() {
		this.setState({
			editMode: true
		});
	}

	apdateName(newText) {
		this.props.apdateName({
			newText: this.state.value,
			id: this.props.tododay.id
		});

		this.setState({
			editMode: false
		});
	}


	render() {
		const buttonClass = ['']

		if(this.props.tododay.active === true){
			buttonClass.push('active')
		}

		let {days} = this.props.tododay;
		let displayElement = "";

		if(this.state.editMode){
			displayElement = <input autoFocus 
						className ="itemTwo" 
						type = "text"
						placeholder = "Введите значение" 
						value = {this.state.value}
						onChange={this.handleChange}  
						onBlur={() => this.apdateName(this.props)} 
					/>;
		}else{
			displayElement = <span onClick={(e) => this.activeTododay(this.props.tododay.id) } 
									onDoubleClick={this.goToEditMode.bind(this)}>
									{days} 
							</span>;
		}

		return ( 
			<li className = {buttonClass.join('')} 
					key={this.props.tododay.id} 
					id={this.props.tododay.id}>{displayElement}

				<i className="fa fa-times-circle" aria-hidden="true" onClick={(e) => this.removeTododay(this.props.tododay.id)}></i>
			</li>
		)
	}
}