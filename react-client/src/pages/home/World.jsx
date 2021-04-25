import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

export default class World extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>World</span>
            </span>
        );

        return (
            <>
                <Card title={title}>
                    World
                </Card>
            </>
        );
    }
}