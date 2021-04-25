import React, {Component} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './index';
import LPLSpring from './LPLSpring';
import LPLSummer from './LPLSummer';
import MSI from './MSI';
import World from './World';



export default class Home extends Component {
    render () {
        return (
            <Switch>
                <Route exact path='/home' component={HomePage}/>
                <Route path='/home/LPLSpring' component={LPLSpring}/>
                <Route path='/home/LPLSummer' component={LPLSummer}/>
                <Route path='/home/MSI' component={MSI}/>
                <Route path='/home/World' component={World}/>
                <Redirect to='/home'/>
            </Switch>
        );
    }
}