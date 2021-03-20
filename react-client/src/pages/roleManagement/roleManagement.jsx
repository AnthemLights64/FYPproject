import React, {Component} from 'react';
import { Card, Button, Table, Modal, message, Popconfirm } from 'antd';
import {PAGE_SIZE} from '../../utils/constants';
import { reqRoles, reqAddRole, reqSetRolePermissions, reqDeleteRole} from '../../api';
import AddForm from './add-form';
import AuthForm from './auth-form';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formatDate} from '../../utils/dateUtils';

export default class RoleManagement extends Component {

    state = {
        roles: [], // The list of all roles
        role: {}, // The selected role
        isShownAdd: false, // Display the adding interface or not
        isShownAuth: false, //Display the permission setting interface or not
        loading: false
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
                dataIndex: 'create_time',
                render: formatDate
            },
            {
                title: 'Authorization Time',
                dataIndex: 'auth_time',
                render: formatDate
            },
            {
                title: 'Operator',
                dataIndex: 'auth_name'
            }
        ];
    }

    getRoles = async () => {
        this.setState({loading: true});
        const result = await reqRoles();
        this.setState({loading: false});
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
        role.auth_time = Date.now();
        role.auth_name = memoryUtils.user.username;

        const result = await reqSetRolePermissions(role);
        if (result.data.status===0) {
            
            //this.getRoles();
            // If the permissions currently updated is one's own role's, then force quit
            if (role._id===memoryUtils.user.role_id) {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('/login');
                message.info('The permissions of current user has changed. Please login again.');
            } else {
                message.success('Successfully set the role permissions!');
                this.setState({
                    role: [...this.state.roles]
                });
            }
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

        const {roles, role, isShownAdd, isShownAuth, loading} = this.state;

        const title = (
            <span>
                <Button type='primary' onClick={() => this.setState({isShownAdd: true})}>Create Role</Button> &nbsp;&nbsp;
                <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShownAuth: true})}>Set Role Permissons</Button>&nbsp;&nbsp;
                <Popconfirm
                        title="Are you sure to delete this role?"
                        onConfirm={async() => {
                            const result = await reqDeleteRole(role);
                            if (result.data.status===0) {
                                message.success('Successfully deleted the role!');
                            } else {
                                message.error('Failed to delete the role.');
                            }
                            this.getRoles();
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' disabled={!role._id}>
                            Delete
                        </Button>
                    </Popconfirm>
                
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
                    rowSelection={{
                        type: 'radio', 
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {
                            this.setState({
                                role
                            });
                        }
                    }}
                    onRow={this.onRow}
                    loading={loading}
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