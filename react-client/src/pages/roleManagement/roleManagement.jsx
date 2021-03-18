import React, {Component} from 'react';
import { Card, Button, Table, Modal } from 'antd';
import {PAGE_SIZE} from '../../utils/constants';
import { reqRoles } from '../../api';
import AddForm from './add-form';

export default class RoleManagement extends Component {

    state = {
        roles: [], // The list of all roles
        role: {}, // The selected role
        isShownAdd: false, // Display the adding interface or not
    }

    initColumn = () => {
        this.columns = [
            {
                title: 'Role Name',
                dataIndex: 'name'
            },
            {
                title: 'Create Time',
                dataIndex: 'create_time'
            },
            {
                title: 'Authorization Time',
                dataIndex: 'name'
            },
            {
                title: 'Operator',
                dataIndex: 'name'
            }
        ];
    }

    getRoles = async () => {
        const result = await reqRoles();
        if (result.data.status===0) {
            const roles = result.data.data;
            this.setState({
                roles
            });
        }
    }

    onRow = (role) => {
        return {
            onClick: event => {
                console.log('row onClick', role)
                this.setState({
                    role
                });
            }
        }
    }

    addRole = () => {

    }

    UNSAFE_componentWillMount () {
        this.initColumn();
    }

    componentDidMount () {
        this.getRoles();
    }

    render () {

        const {roles, role, isShownAdd} = this.state;

        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({isShownAdd: true})}>Create Role</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id}>Set Role Permissons</Button>
            </span>
        );

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
                    dataSource={roles}
                    rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
                    onRow={this.onRow}
                >
                </Table>

                <Modal
                    title='Add New Role'
                    visible={isShownAdd}
                    onOk={this.addRole}
                    onCancel={() => {this.setState({
                        isShownAdd: false
                    })}}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>      
            </Card>
        );
    }
}