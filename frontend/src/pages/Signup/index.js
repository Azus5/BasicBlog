import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import './styles.css'

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    let user = {
      username,
      email,
      password,
      passwordConfirmation
    }

    axios.post('http://localhost:3000/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          handleLogin(response.data);
          alert('User created!')
          redirect();
        } else {
          setErrors({
            errors: response.data.errors
          })
        }
      }).catch(err => console.log('Signup error: ' + err.message));
  }

  function handleLogin(data) {
    localStorage.setItem('userLogged', 'logged');
    localStorage.setItem('userData', JSON.stringify(data.user));
  }

  function redirect() {
    history.push('/')
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
    <div className="container">
      <header>
        <Link className="header-option" to="/">
          Home
				</Link>

        <Link className="header-option" to="/login">
          Login
				</Link>

        <Link className="header-option" to="/Signup">
          Signup
				</Link>
      </header>


      <form onSubmit={handleSubmit} className="login-form">
        <h1>Signup for free</h1>

        <div className="input">
          <input 
            type="text" 
            name="username" 
            value={username}
            required
            onChange={e => setUsername(e.target.value)}/>
            <label>Username</label>
        </div>

        <div className="input">
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)} />
            <label>Email</label>
        </div>

        <div className="input">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)} />
            <label>Password</label>
        </div>

        <div className="input">
        <input
          type="password"
          name="password_confirmation"
          required
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)} />
          <label>Password Confirmation</label>
        </div>
        <div className="options">
          <button placeholder="submit" type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        {
          errors ? handleErrors() : null
        }
      </div>
    </div>
  );
}