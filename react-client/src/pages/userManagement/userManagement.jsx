import React, {Component} from 'react';
import { Card, Button, Table, Modal } from 'antd';
import {PAGE_SIZE} from '../../utils/constants';
import {formatDate} from '../../utils/dateUtils';
import { reqUsers } from '../../api';

export default class UserManagement extends Component {

    state = {
        users: [], // List of all users
        roles: [], // List of all roles
        isShown: false, // Display the interface or not
    }

    initColumns = () => {
        this.columns = [
            {
                title: 'Username',
                dataIndex: 'username'
            },
            {
                title: 'Register Time',
                dataIndex: 'create_time',
                render: formatDate
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: 'Notes',
                dataIndex: 'notes'
            },
            {
                title: 'Action',
                render: (user) => (
                    <span>
                        <Button type='link'>Edit</Button>
                        <Button type='link' style={{color: "red"}}>Delete</Button>
                    </span>
                )
            }
        ];
    }

    // Generate the object including all the roles according to the array 'role' (use value of role's id as attribute name)
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {});
        this.roleNames = roleNames;
    }

    addOrUpdateUser = () => {
        
    }

    getUsers = async () => {
        const result = await reqUsers();
        if (result.data.status===0) {
            const {users, roles} = result.data.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            });
        } else {

        }
    }

    UNSAFE_componentWillMount () {
        this.initColumns();
    }

    componentDidMount () {
        this.getUsers();
    }

    render () {

        const {users, isShown} = this.state;

        const title = <Button type='primary'>Create User</Button>;

        return (
            <Card title={title}>
                <Table
                    columns={this.columns}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE, 
                        showQuickJumper: true, 
                    }}
                    dataSource={users}
                >
                </Table>

                <Modal
                    title='Create User'
                    visible={isShown}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({isShown: false})}
                >
                    <div>Add or Update Interface</div>
                </Modal>      
            </Card>
        );
    }
}