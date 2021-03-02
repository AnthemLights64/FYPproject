import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';
import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import menuList from '../../config/menuConfig';
class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()), // String of current time
    }

    getTime = () => {
        setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.route===path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.route===path);
                if (cItem) {
                    title = cItem.title
                }
            }
        });
        return title;
    }

    // Execute once after the first execution of render()
    // Send ajax request or launch timer
    componentDidMount() {
        this.getTime();
    }

    render () {

        const {currentTime} = this.state;

        const username = memoryUtils.user.username;

        const title =  this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>Welcome, {username}</span>
                    <a href="javascript:">Logout</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);