import React from 'react';
import './loginform.css';

import Header from './header';
import { Redirect } from 'react-router-dom'


export default class LoginForm extends React.Component {

	constructor(props) {
    super(props);
		this.state = {
				login: '',
				password: '',
				activeUser:'',
				checKUser: false,
				mesage: ''
	}

	this.handleChangeEmail = this.handleChangeEmail.bind(this);
	this.handleChangePassword = this.handleChangePassword.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}	

handleChangeEmail(e) {
	this.setState({login: e.target.value});
}

handleChangePassword(e) {
	this.setState({password: e.target.value});
}

onSubmit(e){

	let	user =[]
	
	if(this.state.login.length < 5){

		this.setState({		mesage: 'Логин должен быть не мение 5 символов'	});

	} else if (this.state.password.length < 5){

		this.setState({		mesage: 'Пароль должен быть не мение 5 символов'	});

	} else if ((localStorage.getItem('Account'))!=null){
			user =JSON.parse(localStorage.getItem('Account'));
			let userCheck = user
					userCheck = userCheck.filter((todo, index) => todo.login === this.state.login)

								if(userCheck.length === 0){
									user.push ({login:this.state.login, password:this.state.password});
									localStorage.setItem('Account', JSON.stringify(user));
									this.setState({
										activeUser: this.state.login,
										checKUser: true
									});
									localStorage.setItem('User', JSON.stringify( this.state.login));

									}else{
										let	userCheckPassword = userCheck.filter((todo, index) => todo.password === this.state.password)
												if(userCheckPassword.length === 0){
																this.setState({		mesage: 'Логин или пароль введены неверно.'	});

												}else{
																localStorage.setItem('User', JSON.stringify( this.state.login));
															}
												}

	} else {
			user.push ({login:this.state.login, password:this.state.password});
			localStorage.setItem('Account', JSON.stringify(user));
			this.setState({
				activeUser: this.state.login,
				checKUser: true
			});
			localStorage.setItem('User', JSON.stringify( this.state.login));
		}

				this.setState({
							login: "",
							password: ""
						});
	}


  render() {
		const {from } = this.props.location.state || {from: {pathname: '/' } }

		let mesage = this.state.mesage;
		if(mesage.length !== 0){
			console.log(mesage.length)
		}

		if(localStorage.getItem('User')!=null) {
			return (
			<Redirect to ={from} />
			)
		}

    return (<div className="App">
		<header className="App-header">

			<Header />

		<form className="login" action="/register" method="post">
			<input className="UserName" 
							type="text" 
							placeholder="username" 
							id="username" 
							name="Login"
							onChange={this.handleChangeEmail}
							value={this.state.login}
							/><br/>
			<input className="UserPassword" 
							type="password" 
							placeholder="password" 
							id="password" 
							name="Password"
							onChange={this.handleChangePassword}
							value={this.state.password}
							/><br/>
							<div className = 'mesage'> {mesage} </div>
			<input className="loginButton" 
							type="button" 
							id="entrance" 
							value="Login"
							onClick={() => this.onSubmit(this.state)}

							/>
			<br/>
		</form>

        </header>
      </div>

    );
  }
}


