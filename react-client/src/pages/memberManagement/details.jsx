import React, {Component} from 'react';
import { Card, List, Button } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {BASE_IMAGE_URL} from '../../utils/constants';

const Item = List.Item;

export default class Details extends Component {
    render () {

        const {name, nickname, position, gender, dob, nationality, phone, address, photo=[], detail} = this.props.location.state.member;

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>Member details</span>
            </span>
        );

        return (
            <Card title={title} className='member-details'>
                <List>
                    <Item>
                        <span className="left">Name:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">Nickname:</span>
                        <span>{nickname}</span>
                    </Item>
                    <Item>
                        <span className="left">Position:</span>
                        <span>{position}</span>
                    </Item>
                    <Item>
                        <span className="left">Gender:</span>
                        <span>{gender}</span>
                    </Item>
                    <Item>
                        <span className="left">DoB:</span>
                        <span>{dob}</span>
                    </Item>
                    <Item>
                        <span className="left">Nationality:</span>
                        <span>{nationality}</span>
                    </Item>
                    <Item>
                        <span className="left">Phone No.:</span>
                        <span>{phone}</span>
                    </Item>
                    <Item>
                        <span className="left">Address:</span>
                        <span>{address}</span>
                    </Item>
                    <Item>
                        <span className="left">Photo:</span>
                        <span>
                            {
                                photo.map(img => (
                                    <img
                                        key={img}
                                        className="member-image"
                                        src={BASE_IMAGE_URL + img}
                                        alt="img"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">Details:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                </List>
            </Card>
        );
    }
}