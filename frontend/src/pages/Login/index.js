import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

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
          props.handleLogin(response.data);
          redirect()
        } else {
          setErrors({
            errors: response.data.errors
          })
        }
      })
      .catch(err => console.log('Login error: ' + err.message))
  }

  function redirect() {
    props.history.push('/')
  }

  function handleErros() {
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
          onChange={e => setUsername(e.target.value)}/>

        <input 
          type="text" 
          name="email" 
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}/>          

        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}/>

        <button placeholder="submit" type="submit">Log In</button>

        <div>
          or <Link to='/signup'>Sign up</Link>
        </div>
      </form>
      <div>
        {
          errors ? handleErros() : null
        }
      </div>
    </div>
  );
}