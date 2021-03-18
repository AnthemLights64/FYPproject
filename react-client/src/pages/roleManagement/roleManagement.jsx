import React, {Component} from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import {PAGE_SIZE} from '../../utils/constants';
import { reqRoles, reqAddRole, reqSetRolePermissions} from '../../api';
import AddForm from './add-form';
import AuthForm from './auth-form';

export default class RoleManagement extends Component {

    state = {
        roles: [], // The list of all roles
        role: {}, // The selected role
        isShownAdd: false, // Display the adding interface or not
        isShownAuth: false, //Display the permission setting interface or not
    }

    constructor (props) {
        super(props);
        this.auth = React.createRef();
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
                //console.log('row onClick', role)
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

    setRolePermissons = async () => {

        this.setState({
            isShownAuth: false
        });

        const role = this.state.role;
        const menus = this.auth.current.getMenus();
        role.menus = menus;
        const result = await reqSetRolePermissions(role);
        if (result.data.status===0) {
            message.success('Successfully set the role permissions!');
            //this.getRoles();
            this.setState({
                role: [...this.state.roles]
            });
        } else {
            message.error('Failed to set the role permissions.');
        }
    }

    UNSAFE_componentWillMount () {
        this.initColumn();
    }

    componentDidMount () {
        this.getRoles();
    }

    render () {

        const {roles, role, isShownAdd, isShownAuth} = this.state;

        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({isShownAdd: true})}>Create Role</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShownAuth: true})}>Set Role Permissons</Button>
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

                <Modal
                    title='Set Role Permissions'
                    visible={isShownAuth}
                    onOk={this.setRolePermissons}
                    onCancel={() => {
                        this.setState({
                            isShownAuth: false
                        });
                    }}
                >
                    <AuthForm
                        role={role}
                        ref={this.auth}
                    />
                </Modal>  

            </Card>
        );
    }
}