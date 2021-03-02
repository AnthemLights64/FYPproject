import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import './index.less';
import { formatDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()), // String of current time
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
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

    // Called before the current component is unloaded
    componentWillUnmount () {
        // Clear Timer
        clearInterval(this.intervalId);
    }

    // Logout the current account
    logout = () => {
        Modal.confirm({
            title: 'Do you want to logout?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                // Remove the stored data of user
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/login');
            }
        });
    }   

    render () {

        const {currentTime} = this.state;

        const username = memoryUtils.user.username;

        const title =  this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>Welcome, {username}</span>
                    <Button className="header-top-button" onClick={this.logout} icon={<LogoutOutlined />} type="link">Logout</Button>
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