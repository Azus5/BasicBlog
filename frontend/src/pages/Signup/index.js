import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [errors, setErrors] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		let user = {
			username,
			email,
			password,
			passwordConfirmation
		}

		axios.post('http://localhost:3000/users', {user}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'created') {
					props.handleLogin(response.data);
					redirect();
				} else {
					setErrors({
						errors: response.data.errors
					})
				}
			}).catch(err => console.log('Signup error: ' + err.message));
	}

	function redirect() {
		props.history.push('/')
	}

	function handleErrors() {
		return (
			<div>
				<ul>
					{errors.map(error => {
						return <li key={error}>{error}</li>
					})}
				</ul>
			</div>
		);
	}

	return (
		<div>
			<h1>Log in</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={username}
					onChange={e => setUsername(e.target.value)} />

				<input
					type="text"
					name="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)} />

				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)} />

				<input
					type="password"
					name="password_confirmation"
					placeholder="Password Confirmation"
					value={passwordConfirmation}
					onChange={e => setPasswordConfirmation(e.target.value)} />
				<button placeholder="submit" type="submit">Sign Up</button>
			</form>
			<div>
				{
					errors ? handleErrors() : null
				}
			</div>
		</div>
	);
}