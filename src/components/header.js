import React from 'react';
import './header.css';
import logo from './../logo.svg';
import { Link, withRouter } from 'react-router-dom';


const fakeAuth = {
	singout(cb){
		delete localStorage["User"]
		setTimeout(cb, 100)
	}
}

const AuthButton = withRouter (({ history }) => (
	localStorage.getItem('User')!=null
	?
			<p>
				 <button onClick ={()=>{
					fakeAuth.singout(()=>history.push('/'))
				}}>Выйти</button>
			</p>
	: <p><button onClick ={()=>{
		fakeAuth.singout(()=>history.push('/login'))
	}}>Войти</button></p>
))



export default class Header extends React.Component {
  render() {
		const nameUser = JSON.parse(localStorage.getItem('User'))
    return (
						<div className = "header">
							<img src={logo} className="App-logo" alt="logo" />
							<h1> -React: To-do list -</h1>
							<div className = "links grid">
								<Link className = "onech" to = "/">Home page</Link>
								<Link to = "/todolist">Todolist page</Link>
							<div className = "username">{nameUser}</div>
						 	<AuthButton />
						</div>

						</div>
    );
  }
}
