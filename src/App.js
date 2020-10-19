
import React from 'react';

import './App.css';

import Home from './components/Home';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Article from './components/Article';

import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';

//Home Screen Take Login Page as a Child




function App() {
  return (
    <div className="row">
        
        <Router>

          <Switch>                 
              <Route  path='/' exact component={Home}   />
              <Route  path='/Dashboard' component={Dashboard}  />
              <Route  path='/Login' component={Login}  />

              <Route  path='/:article' component={Article}  />
              
          </Switch>
        </Router>
    
             
    </div>
  );
}

export default App;
