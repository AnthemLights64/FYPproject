import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
// import {
//     HomeOutlined,
//     ScheduleOutlined,
//     TeamOutlined,
//     BarsOutlined
//   } from '@ant-design/icons';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig'; 
import memoryUtils from '../../utils/memoryUtils';

const {SubMenu} = Menu;
class LeftNav extends Component {

    // Identify whether the currently logged in user has permission to the item
    hasAuth = (item) => {

        const {route, isPublic} = item;
        const menus = memoryUtils.user.role.menus;
        const username = memoryUtils.user.username;
        /*
        1. If the current user is admin, return true
        2. If the item is public
        3. If the current user has permission to this item (whether 'route' is in the array 'menus')
        */
        if (username==='admin' || isPublic || menus.indexOf(route)!==-1) {
            return true;
        } else if (item.children) { // 4. It the current user has permission to the sub-item of this item
            return !!item.children.find(child => menus.indexOf(child.route)!==-1);
        }

        return false;
    }

    // getMenuNodes_map = (menuList) => {
    //     return menuList.map(item => {
    //         if (!item.children) {
    //             return (
    //                 <Menu.Item key={item.key} icon={item.icon}>
    //                     <Link to={item.route}>
    //                         {item.title}
    //                     </Link>
    //                 </Menu.Item>
    //             );
    //         } else {
    //             return (
    //                 <SubMenu key={item.key} icon={item.icon} title={item.title}>
    //                     {this.getMenuNodes(item.children)}
    //                 </SubMenu>
    //             );
    //         }
    //     });
    // }

    getMenuNodes = (menuList) => {

        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {

            // If the current user has the permission to the item, then display that item of the menu
            if (this.hasAuth(item)) {
                if (!item.children) {
                    pre.push((
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.route}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    ));
                } else {
                    const cItem = item.children.find( cItem => path.indexOf(cItem.route)===0);
                    if (cItem) {
                        this.openKey = item.key
                    }
                    
                    pre.push((
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    ));
                }
            }

            return pre;
        }, []);
    }

    // Execute only once before the first render()
    UNSAFE_componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render () {

        let path = this.props.location.pathname;
        const openKey = this.openKey;
        if (path.indexOf('member')===0) { // The current request is for a member or its subrouting interface
            path = '/member';
        }

        return (
                <div className="left-nav">
                    <Link to='/' className="left-nav-header">
                        <img src={logo} alt="logo"/>
                    </Link>

                    <Menu
                        defaultOpenKeys={[openKey]}
                        selectedKeys={[path]}
                        mode="inline"
                        theme="dark"
                        >
                        {/* <Menu.Item key="/home" icon={<HomeOutlined />}>
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
                        </SubMenu> */}
                        
                        {
                            this.menuNodes
                        }

                    </Menu>
                </div>

        );
    }
}

export default withRouter(LeftNav);