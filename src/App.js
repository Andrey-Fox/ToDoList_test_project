import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Tododays from './components/tododays';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';


class App extends Component {
	constructor(props) {
		super(props);

		let tododays = [],
			todos = [],
			tododayActive = false,
			tododaytask = [],
			nextId = 1,
			nextDaysId = 1,
			users = localStorage.getItem('User');

		if(localStorage.getItem(users)) {
		let todostorage = JSON.parse(localStorage.getItem(users));

			tododays = todostorage.tododays
			todos = todostorage.todos
			tododayActive = todostorage.tododayActive
			tododaytask = todostorage.tododaytask
			nextId = todostorage.nextId
			nextDaysId = todostorage.nextDaysId
		}

		this.state = {
			tododays: tododays,
			todos: todos,
			tododayActive: tododayActive,
			tododaytask: tododaytask,
			nextId: nextId,
			nextDaysId: nextDaysId,
			users: users
		};

		this.addTododays = this.addTododays.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.removeTododay = this.removeTododay.bind(this);
		this.toDoDaysActive = this.toDoDaysActive.bind(this);
		this.apdateTodo = this.apdateTodo.bind(this);
		this.todoHi = this.todoHi.bind(this)
		this.apdateNamedays = this.apdateNamedays.bind(this)
	}

	addTododays(tododay) {
		if(tododay) {
			const asd = this.state.tododays.concat()
			const obgs = asd.find(c=> c.active === true)

			if(obgs !== undefined) {
				obgs.active = false
			}

			let tododays = this.state.tododays.slice();

			tododays.push({active: true, id: this.state.nextDaysId, days: "new day"});

			this.setState({
				tododays: tododays,
				nextDaysId: ++this.state.nextDaysId,
				tododayActive: this.state.nextDaysId-1,
				tododaytask: [],
			});

			let todooo = {
				tododays:tododays,tododaytask:[]
			};

			this.todoHi(todooo);
			}
	}

	todoHi(e) {
		let todo = {
			tododays: e.tododays === undefined ? this.state.tododays : e.tododays,
			todos: e.todos === undefined ? this.state.todos : e.todos,
			tododayActive: e.tododayActive === undefined ? this.state.tododayActive : e.tododayActive,
			tododaytask: e.tododaytask === undefined ? this.state.tododaytask : e.tododaytask,
			nextId: this.state.nextId,
			nextDaysId: this.state.nextDaysId
		};

		localStorage.setItem(this.state.users, JSON.stringify(todo));
	}

	toDoDaysActive(DayId) {
		const asd = this.state.tododays.concat()
		const obgs = asd.find(c=> c.active === true)

		if(obgs !== undefined) {
			obgs.active = false
		}

		const obg = asd.find(t=> t.id === DayId)
		obg.active = true

		this.setState({
			tododays: asd,
			tododayActive: DayId,
			tododaytask: this.state.todos.filter((todo, index) => todo.activeDay === DayId)
		});

		let todooo = {
			tododayActive: DayId,
			tododaytask: this.state.todos.filter((todo, index) => todo.activeDay === DayId)
		};

		this.todoHi(todooo);
	}

	addTodo(todoText) {

		if(this.state.tododayActive) {
			let todos = this.state.todos.slice();
			let tododaytask = this.state.tododaytask.slice();

			todos.push({
				activeDay: this.state.tododayActive,
				id: this.state.nextId,
				text: todoText
			});
			tododaytask.push({
				activeDay: this.state.tododayActive,
				id: this.state.nextId, text: todoText
			});

			this.setState({
				todos: todos,
				nextId: ++this.state.nextId,
				tododaytask: tododaytask
			});

			let todooo = {
				todos: todos,
				tododaytask: tododaytask
			};
			this.todoHi(todooo);
		}
	}

	apdateNamedays(todoText) {
		const asd = this.state.tododays.concat()
		const obgs = asd.find(c=> c.id === todoText.id)

		if(obgs !== undefined) {
			obgs.days = todoText.newText
		}
		this.setState({
			tododays: asd
		});

		let todooo = {
			tododays: asd
		};
		this.todoHi(todooo);
	}

	apdateTodo(todoText) {
		const asd = this.state.todos.concat()
		const obgs = asd.find(c=> c.id === todoText.id && c.activeDay===todoText.activeDay)
		if(obgs !== undefined) {
			obgs.text = todoText.newText
		}

		let todoss = asd.filter((todo, index) => todo.activeDay === (todoText.activeDay ))

		this.setState({
			todos: asd,
			tododaytask: todoss
		});

		let todooo = {
			todos: asd,
			tododaytask: todoss
		};

		this.todoHi(todooo);
	}

	removeTododay(id) {
		this.setState({
			tododays: this.state.tododays.filter((todo, index) => todo.id !== id),
			todos: this.state.todos.filter((todo, index) => todo.activeDay !== id),
		});

		if(this.state.tododayActive === id) {
			this.setState({
				tododaytask: []
			});
		}

		let todooo = {
			tododays: this.state.tododays.filter((todo, index) => todo.id !== id),
			todos: this.state.todos.filter((todo, index) => todo.activeDay !== id),
			tododaytask: this.state.tododayActive === id ? [] : this.state.tododaytask
		};

		this.todoHi(todooo);

	}

	removeTodo(id) {
		this.setState({
			todos: this.state.todos.filter((todo, index) => todo.id !== id),
			tododaytask: this.state.tododaytask.filter((todo, index) => todo.id !== id)
		});

		let todooo = {
			tododays: this.state.tododays.filter((todo, index) => todo.id !== id),
			todos: this.state.todos.filter((todo, index) => todo.id !== id),
			tododaytask: this.state.tododaytask.filter((todo, index) => todo.id !== id)
		};

		this.todoHi(todooo);
	}


	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Header />
					<div className ="wraper">
						<div className = "to-do-days grid">
							<ul>
								{this.state.tododays.map((tododays)=> {
									return(
										<Tododays tododay={tododays} 
											addtododays = {this.addTododays}  
											removeTododay={this.removeTododay}
											toDoDaysActive={this.toDoDaysActive}
											apdateName ={this.apdateNamedays}
										/>
									)
								})
								}
								<li className = "new-to-do-days" onClick={() => this.addTododays(true)}>
										<span>+</span> 
								</li>
							</ul>
						</div>

					<TodoInput todoText="" 
						activeId={this.state.tododayActive} 
						addTodo={this.addTodo} 
						toDoDaysActive={this.toDoDaysActive}
					/>

					{this.state.tododaytask.map((todo) => { 
						return ( 
							<TodoItem todo={todo} 
								key={todo.id} 
								id={todo.id} 
								removeTodo={this.removeTodo}
								apdateTodoText={this.apdateTodo}
							/>
						)
					})
					}
					</div>
				</header>
			</div>
		);
	}
}


export default App;
