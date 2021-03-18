import React, {Component} from 'react';
import {Card, Button, Table} from 'antd';
import {PAGE_SIZE} from '../../utils/constants';

export default class RoleManagement extends Component {

    state = {
        roles: [
            // {
            //     "menus": [],
            //     "_id": "8fsafihf1f9ghafasf",
            //     "name": "test",
            //     "create_time": 151511523532525,
            //     "__v": 0,
            //     "auth_time": 151511523532526,
            //     "auth_name": "test1"
            // }
        ]
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

    onRow = (role) => {
        return {
            onClick: event => {
                console.log('row onClick', role)
                alert('Row Selected.')
            }
        }
    }

    UNSAFE_componentWillMount () {
        this.initColumn();
    }

    render () {

        const {roles} = this.state;

        const title = (
            <span>
                <Button type='primary'>Create Role</Button> &nbsp;&nbsp;
                <Button type='primary' disabled>Set Role Permissons</Button>
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
                    rowSelection={{type: 'radio'}}
                    onRow={this.onRow}
                >
                </Table>
            </Card>
        );
    }
}