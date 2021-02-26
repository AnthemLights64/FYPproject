import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

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
                    <Content style={{backgroundColor: '#ffffff'}}>Content</Content>
                    <Footer style={{textAlign: 'center'}}>Royal Never Give Up</Footer>
                </Layout>
            </Layout>
        );
    }
}