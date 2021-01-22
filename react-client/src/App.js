import React, { Component } from "react";
import { Button, message } from "antd";
import './App.less';

export default class App extends Component{
  
  handleClick = () => {
    message.success("Success!");
  }

  render () {
    return <Button type="primary" onClick={this.handleClick}>Primary</Button>
  }

}