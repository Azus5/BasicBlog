import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './styles.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    let user = {
      username,
      email,
      password
    }

    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data);
          redirect()
        } else {
            alert(response.data.errors);
        }
      })
      .catch(err => console.log('Login error: ' + err.message))
  }

  function handleLogin(data) {
    localStorage.setItem('userLogged', 'logged');
    localStorage.setItem('userData', JSON.stringify(data.user));
  }

  function redirect() {
    history.push('/')
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
        <h1>Enter with your account</h1>

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
            onChange={e => setEmail(e.target.value)}/> 
            <label>Email</label>    
        </div>     

        <div className="input">
          <input 
            type="password" 
            name="password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            <label>Password</label>
        </div>
        <div className="options">
          <Link to='/signup'>don't have an account?</Link>
          <button placeholder="submit" type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}