import React, {Component} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import MembersList from './index';
import Operations from './operations';
import Details from './details';

import './memberManagement.less';


export default class MemberManagement extends Component {
    render () {
        return (
            <Switch>
                <Route exact path='/management/member' component={MembersList}/>
                <Route path='/management/member/operations' component={Operations}/>
                <Route path='/management/member/details' component={Details}/>    
                <Redirect to='/management/member'/>
            </Switch>
        );
    }
}