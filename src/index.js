import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginForm from './components/loginForm';
import HomePage from './components/HomePage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest }) => (
<Route {...rest} render ={(props)=> (
	localStorage.getItem('User')!=null
		? <Component {...props} />
		: <Redirect to={{
					pathname: '/login',
					state: { from: props.location}
			}} 
		/>
	)} 
/>
)



ReactDOM.render(
<BrowserRouter>
	<Switch>
		<Route exact path ="/" component={HomePage} />
		<Route exact path ="/login" component={LoginForm} />

		<PrivateRoute path ="/todolist" component={App} />
	</Switch>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
