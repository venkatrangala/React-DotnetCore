import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../comtext/authContext/authContext';

const Register = (props) => {
	const { register, isAuthencated, error, clearErrors, setError } = useContext(AuthContext);
	useEffect(
		() => {
			if (isAuthencated) {
				props.history.push('/');
			}
		},
		[ isAuthencated, props.history ]
	);

	var initialState = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: ''
	};

	const [ user, setUser ] = useState(initialState);
	const { firstName, lastName, email, password, password2 } = user;
	onchange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
		if (error !== null) {
			clearErrors();
		}
	};
	onsubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setError('Password does not match');
		} else {
			register({
				firstName,
				lastName,
				email,
				password
			});
			setUser(initialState);
		}
	};
	return (
		<div className='register'>
			<h1>Sign Up</h1>
			<form>
				<input type='text' name='firstName' placeholder='firstName' value={firstName} onChange={onchange} />
				<input type='text' name='lastName' placeholder='lastName' value={lastName} onChange={onchange} />
				<input type='email' name='email' placeholder='Email' value={email} onChange={onchange} />
				<input type='password' name='password' placeholder='Password' value={password} onChange={onchange} />
				<input
					type='password'
					name='password2'
					placeholder='Confirm Password'
					value={password2}
					onChange={onchange}
					required
				/>
				<input type='submit' value='Sign Up' className='btn' />
			</form>
			<div className='question'>
				{error !== null &&
					error !== '' &&
					error !== undefined &&
					error.map((err) => (
						<button className='danger' type='button'>
							{err.msg} <span onClick={() => clearErrors()}>X</span>
						</button>
					))}
				{error === '' && (
					<button className='green' type='button'>
						{'Registration successful. Please login.'} <span onClick={() => clearErrors()}>X</span>
					</button>
				)}
				<p>
					Already have an accout? <Link to='/login'>Sign In </Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
