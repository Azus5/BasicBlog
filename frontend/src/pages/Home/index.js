import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import './styles.css'

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data)
        } else {
          handleLogout()
        }
      })
      .catch(error => console.log('Logged in Error:', error.message))
  }, [])

  function handleLogin(data) {
    localStorage.setItem('userLogged', 'logged');
    localStorage.setItem('userData', JSON.stringify(data.user));
  }

  function handleLogout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userData');
  }

  function handleClick() {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
      .then(response => {
        handleLogout();
        history.push('/')
      }).catch(err => console.log('Error: ' + err.message))
  }

  function UserAuthenticated() {
    let userLogged = localStorage.getItem('userLogged')

    if(userLogged === 'logged') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      // console.log(userData);
      return(
        <div className="container">
          <header>
            <Link className="header-option" to="/posts">
              Posts
            </Link>

            <Link className="header-option" onClick={() => handleClick()}>
              Logout
            </Link>
          </header>

          <main>
            <h1>Welcome back, {userData.username}</h1>
          </main>
        </div>
      );
    } else {
      return (
        <div className="container">
          <header>
            <Link className="header-option" to="/login">
              Login
            </Link>

            <Link className="header-option" to="/Signup">
              Signup
            </Link>
          </header>

          <main>
            <h1>To use this website, create an account. IT’S FREE</h1>
          </main>
        </div>
      );
    }
  }

  return (
      <UserAuthenticated />
  );
}