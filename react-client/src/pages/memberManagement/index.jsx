import React, {Component} from 'react';
import { Card, Input, Button, Table, Space, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import {reqDeleteMember, reqMembers, reqSearchMembers} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';

const Option = Select.Option;
export default class MembersList extends Component {

    state = {
        total: 0, // Number of members
        members: [
            // {
            //     name: 'Yuanhao Li',
            //     nickname: 'Xiaohu',
            //     position: 'Player',
            //     gender: 'Male',
            //     dob: '1998-01-28',
            //     nationality: 'China',
            //     phone: '',
            //     address: 'Shanghai',
            //     photo: ["image-1615697506989.jpg"],
            //     _id: "safff1f11f1f1"
            // }
        ],
        loading: false,
        searchName: '',
        searchType: 'memberName',
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
              render: (member) => (
                <Space>
                    <Button type='link' onClick={() => this.props.history.push('/management/member/details', {member})}>Details</Button>
                    <Button type='link' onClick={() => member ? this.props.history.push('/management/member/operations?member=' + JSON.stringify(member)) : this.props.history.push('/management/member/operations')}>Edit</Button>
                    <Button type='link' style={{color: "red"}} onClick={() => {
                        //console.log(member)
                        //console.log(member._id)
                        reqDeleteMember(member)
                        this.getMembers(1)
                    }}>Delete</Button>
                </Space>
              ),
            },
          ];
    }

    // Get the list of specified page number
    getMembers = async (pageNum) => {
        this.setState({loading: true});
        const {searchName, searchType} = this.state;
        let result;
        if (searchName) {
            result = await reqSearchMembers({pageNum, pageSize: PAGE_SIZE, searchName, searchType});
            // console.log(searchName)
            // console.log(searchType)
            // console.log(searchType==='memberName')
            // console.log(result)
        } else {
            result = await reqMembers(pageNum, PAGE_SIZE);
            //console.log(result)
        }
        this.setState({loading: false});
        //console.log(result.status)
        //console.log(result.data)
        //console.log(result.data.data)
        //console.log(result.data.data.list)  
        if (result.data.status===0) {
            const {total, list} = result.data.data;
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

        const { members, total, loading, searchName, searchType } = this.state;

        const title = (
            <span>
                <Select 
                value={searchType} 
                style={{width: 200}} 
                onChange={value => this.setState({searchType:value})}
                >
                    <Option value='memberName'>Search by Name</Option>
                    <Option value='memberNickname'>Search by Nickname</Option>
                    <Option value='memberPosition'>Search by Postion</Option>
                </Select>
                <Input 
                placeholder='keyword' 
                prefix={<SearchOutlined />} 
                style={{width: 100, margin: '0 10px'}} 
                value={searchName}
                onChange={event => this.setState({searchName:event.target.value})}
                />
                <Button type='primary' onClick={() => this.getMembers(1)}>Search</Button>
            </span>
        );
        
        const extra = (
            <Button type='primary' icon={<PlusOutlined />} onClick={() => this.props.history.push('/management/member/operations')}>
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