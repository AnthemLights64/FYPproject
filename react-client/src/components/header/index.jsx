import React, {Component} from 'react';
import './index.less';

export default class Header extends Component {
    render () {
        return (
            <div className="header">
                <div className="header-top">
                    <span>Welcome, admin</span>
                    <a href="javascript:">Logout</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">Homepage</div>
                    <div className="header-bottom-right">
                        <sapn>Time now</sapn>
                    </div>
                </div>
            </div>
        );
    }
}