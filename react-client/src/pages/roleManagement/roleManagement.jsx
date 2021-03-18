import React, {Component} from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import {PAGE_SIZE} from '../../utils/constants';
import { reqRoles, reqAddRole } from '../../api';
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
        // Validate the form
        this.form.current.validateFields()
            .then( async values => {

                this.setState({
                    isShownAdd: false
                });

                // Collect input data
                const {roleName} = values;
                this.form.current.resetFields();

                // Request add new role
                const result = await reqAddRole(roleName);

                // Give a hint based on the result
                if (result.data.status===0) {
                    message.success('Successfully added the role!');
                    this.getRoles();
                    const role = result.data.data;
                    // const roles = [...this.state.roles];
                    // roles.push(role);
                    // this.setState({
                    //     roles
                    // });
                    this.setState(state => ({
                        roles: [...state.roles, role]                        
                    }));
                } else {
                    message.error('Failed to add new role');
                }
            })
            .catch();


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
                    onCancel={() => {
                        this.setState({
                            isShownAdd: false
                        });
                        this.form.current.resetFields();
                    }}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>      
            </Card>
        );
    }
}