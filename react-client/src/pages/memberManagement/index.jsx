import React, {Component} from 'react';
import { Card, Input, Button, Table, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import {reqMembers} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';

export default class MembersList extends Component {

    state = {
        total: 0, // Number of members
        members: [],
        loading: false
    }

    // Initialize the array of the table columns
    initColumns = () => {
        this.columns = [
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Nickname',
              dataIndex: 'nickname',
            },
            {
              title: 'Position',
              dataIndex: 'position',
            },
            
            {
              width: 200,
              align: 'center',
              title: 'Action',
              render: () => (
                <Space>
                    <Button type='link'>Details</Button>
                    <Button type='link'>Edit</Button>
                    <Button type='link'>Delete</Button>
                </Space>
              ),
            },
          ];
    }

    // Get the list of specified page number
    getMembers = async (pageNum) => {
        this.setState({loading: true});
        const result = await reqMembers(pageNum, PAGE_SIZE);
        this.setState({loading: false});
        if (result.state===0) {
            const {total, list} = result.data;
            this.setState({
                total,
                members: list
            });
        }
    }

    UNSAFE_componentWillMount () {
        this.initColumns();
    }

    componentDidMount () {
        this.getMembers(1); // the 1st page
    }

    render () {

        const { members, total, loading } = this.state;

        const title = (
            <span>
                <Input placeholder='keyword' prefix={<SearchOutlined />} style={{width: 100, marginRight: '10px'}} />
                <Button type='primary'>Search</Button>
            </span>
        );
        
        const extra = (
            <Button type='primary' icon={<PlusOutlined />}>
                New Member
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table 
                    columns={this.columns}
                    dataSource={members}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE, 
                        showQuickJumper: true, 
                        total,
                        onChange: this.getMembers
                    }}
                    loading={loading}
                ></Table>
            </Card>
        );
    }
}