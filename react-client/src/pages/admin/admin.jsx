import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Calendar from '../calendar/calendar';
import Member from '../member/member';
import MemberManagement from '../memberManagement/memberManagement';
import RoleManagement from '../roleManagement/roleManagement';
import UserManagement from '../userManagement/userManagement';


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render () {

        const user = memoryUtils.user;
        // No user is stored in memory, which means not logged in
        if (!user || !user._id) {
            // Automatically jump to the login screen
            return <Redirect to='/login'/>
        }

        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin: 20, backgroundColor: '#ffffff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/calendar' component={Calendar}/>
                            <Route path='/member' component={Member}/>
                            <Route path='/management/member' component={MemberManagement}/>
                            <Route path='/management/user' component={UserManagement}/>
                            <Route path='/management/role' component={RoleManagement}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Royal Never Give Up</Footer>
                </Layout>
            </Layout>
        );
    }
}