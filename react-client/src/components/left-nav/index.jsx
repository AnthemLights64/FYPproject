import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    HomeOutlined,
    ScheduleOutlined,
    TeamOutlined,
    BarsOutlined
  } from '@ant-design/icons';
import './index.less';
import logo from '../../assets/images/logo.png';

const {SubMenu} = Menu;

export default class LeftNav extends Component {
    render () {
        return (
                <div className="left-nav">
                    <Link to='/' className="left-nav-header">
                        <img src={logo} alt="logo"/>
                    </Link>

                    <Menu
                        defaultOpenKeys={['sub']}
                        mode="inline"
                        theme="dark"
                        >
                        <Menu.Item key="/home" icon={<HomeOutlined />}>
                            <Link to='/home'>
                                Homepage: Team
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/calendar" icon={<ScheduleOutlined />}>
                            <Link to='/calendar'>
                                Calendar
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/member" icon={<TeamOutlined />}>
                            <Link to='/member'>
                                Members
                            </Link>
                        </Menu.Item>
                        <SubMenu key="Management" icon={<BarsOutlined />} title="Management">
                            <Menu.Item key="/management/member" >
                                <Link to='/management/member'>
                                    Members Management
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/management/user" >
                                <Link to='/management/user'>
                                    User Management
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/management/role" >
                                <Link to='/management/role'>
                                    Role Management
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        
                    </Menu>
                </div>

        );
    }
}