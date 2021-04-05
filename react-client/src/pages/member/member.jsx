import React, {Component} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Members from './index';
import Details from './details';



export default class Member extends Component {
    render () {
        return (
            <Switch>
                <Route exact path='/member' component={Members}/>
                <Route path='/member/details' component={Details}/>
                <Redirect to='/member'/>
            </Switch>
        );
    }
}