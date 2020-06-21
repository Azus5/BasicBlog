import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Routes
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/posts' component={Posts} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
