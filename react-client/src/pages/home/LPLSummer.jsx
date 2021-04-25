import React, {Component} from 'react';
import { Button, Card } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

export default class LPLSummer extends Component {
    render () {

        const title = (
            <span>
                <Button 
                type='link' 
                icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
                onClick={() => this.props.history.goBack()}
                >
                </Button>
                <span>LPL Summer</span>
            </span>
        );

        return (
            <>
                <Card title={title}>
                    LPLSummer
                </Card>
            </>
        );
    }
}