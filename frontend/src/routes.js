import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Routes
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
