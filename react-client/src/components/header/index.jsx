import React, {Component} from 'react';
import './index.less';
import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';

export default class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()), // String of current time
    }

    getTime = () => {
        setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    }

    // Execute once after the first execution of render()
    // Send ajax request or launch timer
    componentDidMount() {
        this.getTime();
    }

    render () {

        const {currentTime} = this.state;

        const username = memoryUtils.user.username;

        return (
            <div className="header">
                <div className="header-top">
                    <span>Welcome, {username}</span>
                    <a href="javascript:">Logout</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">Homepage</div>
                    <div className="header-bottom-right">
                        <sapn>{currentTime}</sapn>
                    </div>
                </div>
            </div>
        );
    }
}