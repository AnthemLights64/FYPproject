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
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Homepage: Team
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ScheduleOutlined />}>
                            Calendar
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TeamOutlined />}>
                            Members
                        </Menu.Item>
                        <SubMenu key="sub" icon={<BarsOutlined />} title="Management">
                            <Menu.Item key="4" >Members Management</Menu.Item>
                            <Menu.Item key="5" >User Management</Menu.Item>
                            <Menu.Item key="6" >Role Management</Menu.Item>
                        </SubMenu>
                        
                    </Menu>
                </div>

        );
    }
}