import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

export default class Admin extends Component {
    render () {

        const user = memoryUtils.user;
        // No user is stored in memory, which means not logged in
        if (!user || !user._id) {
            // Automatically jump to the login screen
            return <Redirect to='/login'/>
        }

        return (
            <div>
                Hello, {user.username}
            </div>
        );
    }
}