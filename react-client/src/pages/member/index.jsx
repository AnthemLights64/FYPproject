import React, {Component} from 'react';
import { Card, Pagination } from 'antd';
import {reqMembers} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';
import {BASE_IMAGE_URL} from '../../utils/constants';


const { Meta } = Card;
export default class Members extends Component {

    constructor (props) {
        super(props);
        this.state = {
            minValue: 0,
            maxValue: 3
        };
    }

    state = {
        total: 0,
        members: [],
    }

    getMembers = async (pageNum) => {
        this.pageNum = pageNum;
        this.setState({loading: true});
        const result = await reqMembers(pageNum, PAGE_SIZE);

        this.setState({loading: false});
        if (result.data.status===0) {
            const {total, list} = result.data.data;
            this.setState({
                total,
                members: list
            });
        }
    }

    componentDidMount () {
        this.getMembers(1);
    }

    render () {

        const { members, total } = this.state;

        return (
            <>
                {members && total>0 && members.slice(this.state.minValue, this.state.maxValue).map(member => (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="img" src={BASE_IMAGE_URL + member.photo[0]} />}
                        onClick={() => this.props.history.push('/member/details', {member})}
                    >
                        <Meta title={member.name} />
                    </Card>
                ))}
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={3}
                    onChange={this.getMembers}
                    total={total}
                />
            </>
        );
    }
}