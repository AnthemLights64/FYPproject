import React, {Component} from 'react';

import './login.less';
import logo from './images/logo.jpg';

export default class Login extends Component {
    render () {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>RNG E-Sports Club</h1>
                </header>
                <section className="login-content">
                    <h2>Login</h2>
                    <div>Form Component</div>
                </section>
            </div>
        );
    }
}