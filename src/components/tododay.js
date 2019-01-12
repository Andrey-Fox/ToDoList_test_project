import React from 'react';

export default class TodoDay extends React.Component {
	constructor(props) {
		super(props);
	}
	
// 	addTododay(todo) {
// 			this.props.addtododays(todo);
// 	}

// 	activeTododay(todo) {
// 		this.props.toDoDaysActive(todo);
// }
	
// 	removeTododay(id) {
//     this.props.removeTododay(id);
//   }


  render() {
    return (

							<li key={this.props.id} id={this.props.id} onClick={(e)=> this.activeTododay(this.props.id) }>
								  <span>{this.props.days}</span>
									<i className="fa fa-times-circle" aria-hidden="true" onClick={(e)=> this.removeTododay(this.props.id) }></i>
							</li>

		);
	}
}
