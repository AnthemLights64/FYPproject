import React, {Component} from 'react';
import { Card, Input, Button, Table, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

export default class MembersList extends Component {

    state = {
        members: [
            {
                name: "Yuanhao Li",
                nickname: "Xiaohu",
                position: "Player",
                _id: "1r318fhsafh9qfh9ahf9q1h9fiasf",
            }
        ],
    }

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

    UNSAFE_componentWillMount () {
        this.initColumns();
    }

    render () {

        const {members} = this.state;

        const title = (
            <span>
                <Input placeholder='keyword' style={{width: 100, marginRight: '10px'}} />
                <Button type='primary' icon={<SearchOutlined />}>Search</Button>
            </span>
        );
        
        const extra = (
            <Button type='primary' icon={<PlusOutlined />}>
                New Member
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table columns={this.columns} dataSource={members} rowKey='_id' bordered></Table>
            </Card>
        );
    }
}