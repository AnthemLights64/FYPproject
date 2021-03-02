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

const {SubMenu} = Menu;
class LeftNav extends Component {

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
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.route}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                ));
            } else {
                const cItem = item.children.find(i => i.route===path);
                if (cItem) {
                    this.openKey = item.key
                }
                
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ));
            }
            return pre;
        }, []);
    }

    // Execute only once before the first render()
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render () {

        const path = this.props.location.pathname;
        const openKey = this.openKey;

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