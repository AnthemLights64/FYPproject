import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {BASE_IMAGE_URL} from '../../utils/constants';


export default class Details extends Component {
    render () {

        // const {name, nickname, position, gender, dob, nationality, phone, address, photo=[], details} = this.props.location.state.member;

        const {photo=[], details} = this.props.location.state.member;

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
            <Card title={title}>
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

                <span dangerouslySetInnerHTML={{__html: details}}></span>
            </Card>
        );
    }
}