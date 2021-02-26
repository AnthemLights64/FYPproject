import React, { Component } from "react";
//import { Button, message } from "antd";
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';

export default class App extends Component{

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route> 
        </Switch>
      </BrowserRouter>
    );
  }

}