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
          handleLogin(response)
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

  function userAuthenticated() {
    let userLogged = localStorage.getItem('userLogged')

    if(userLogged === 'logged') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      return(
        <div>
          <h3>Bem vindo! {userData.username}</h3>
          <Link to='/logout' onClick={() => handleClick()}>Log Out</Link>
        </div>
      );
    } else return null
  }

  return (
    <div className="container">
      <header>Headers</header>
      <main>Main</main>
    </div>
  );
}