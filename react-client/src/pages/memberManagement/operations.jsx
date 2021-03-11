import React from 'react';
import { Card, Form, Input, Upload, Button, Radio, DatePicker } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Item} = Form;
const Operations = () => {

    // Specify the configuration object for the Item layout
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
    }

    const [form] = Form.useForm();

    const onFinish = values => {
        form.validateFields()
            .then(values => {
               
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
    }

    const title = (
        <span>
            <Button 
            type='link' 
            icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
            onClick={() => this.props.history.goBack()}
            >
            </Button>
            <span>Add New Member</span>
        </span>
    );
    
    return (
        <Card title={title}>
            <Form {...formItemLayout} onFinish={onFinish} form={form}>
                <Item label="Name" name='name' rules={[{required: true, message: 'Name must be entered!'}]}>
                    <Input placeholder='Please input the name'/>
                </Item>
                <Item label="Nickname" name='nickname' rules={[{required: true, message: 'Nickname must be entered!'}]}>
                    <Input placeholder='Please input the niclkname'/>
                </Item>
                <Item label="Position" name='position' rules={[{required: true, message: 'Position must be entered!'}]}>
                    <Input placeholder='Please input the position'/>
                </Item>
                <Item label="Gender" name='gender'>
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                    </Radio.Group>
                </Item>
                <Item label="DoB" name='dob'>
                    <DatePicker />
                </Item>
                <Item label="Nationality" name='nationality'>
                    <Input placeholder='Please input the nationality'/>
                </Item>
                <Item label="Phone No." name='phonenumber'>
                    <Input placeholder='Please input the phone number'/>
                </Item>
                <Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Item>
            </Form>
        </Card>
    );
}

export default Operations;