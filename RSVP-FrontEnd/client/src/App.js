import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Rsvp from './components/pages/Rsvp';
import GuestState from './context/guestContext/GuestState';
import AuthState from './context/authContext/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<GuestState>
				<Router>
					<div>
						<Navbar />
						<Switch>
							<PrivateRoute exact path='/' component={Home} />
							<PrivateRoute exact path='/rsvp' component={Rsvp} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/about' component={About} />
						</Switch>
					</div>
				</Router>
			</GuestState>
		</AuthState>
	);
}
export default App;
