import React, { useRef } from 'react';
import { Card, Form, Input, Button, Radio, DatePicker } from 'antd';
import PicturesWall from './picturesWall';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import getQuery from '../../utils/urlUtils';
import moment from 'moment';

const {Item} = Form;
const Operations = () => {

    // Specify the configuration object for the Item layout
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
    }

    let history = useHistory();
    const [form] = Form.useForm();
    
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = React.useState(1);
    const onChange = e => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    
    const pw = useRef();
    if(!pw.current){
        pw.current = value;
      }
        
    const onFinish = values => {
        form.validateFields()
            .then(values => {
               const imgs = pw.current.getImages();
               console.log("imgs", imgs)
            })
            .catch(errorInfo => {  
                console.log(errorInfo);
            });
    }


    const member_ = getQuery('member');
    const isUpdate = !!member_;
    let member;
    if (isUpdate) {
        member = JSON.parse(member_);
    } else {
        member = {};
    }
    const {photo} = member;
    

    const title = (
        <span>
            <Button 
            type='link' 
            icon={<ArrowLeftOutlined style={{color: '#B49169', marginRight: 5, fontSize: 20}}/>}
            onClick={() => history.goBack()}
            >
            </Button>
            <span>{isUpdate ? "Edit Member" : "Add New Member"}</span>
        </span>
    );
    
    return (
        <Card title={title}>
            <Form {...formItemLayout} onFinish={onFinish} form={form}>
                <Item label="Name" initialValue={member.name} name='name' rules={[{required: true, message: 'Name must be entered!'}]}>
                    <Input placeholder='Please input the name'/>
                </Item>
                <Item label="Nickname" initialValue={member.nickname} name='nickname' rules={[{required: true, message: 'Nickname must be entered!'}]}>
                    <Input placeholder='Please input the niclkname'/>
                </Item>
                <Item label="Position" initialValue={member.position} name='position' rules={[{required: true, message: 'Position must be entered!'}]}>
                    <Input placeholder='Please input the position'/>
                </Item>
                <Item label="Gender" initialValue={member.gender} name='gender'>
                    <Radio.Group name="radiogroup" onChange={onChange} value={value}>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                </Item>
                <Item label="DoB" initialValue={moment(member.dob)} name='dob'>
                    <DatePicker />
                </Item>
                <Item label="Nationality" initialValue={member.nationality} name='nationality'>
                    <Input placeholder='Please input the nationality'/>
                </Item>
                <Item label="Phone No." initialValue={member.phone} name='phonenumber'>
                    <Input placeholder='Please input the phone number'/>
                </Item>
                <Item label="Address" initialValue={member.address} name='address'>
                    <Input placeholder='Please input the address'/>
                </Item>
                <Item label="Photo" >
                    <PicturesWall ref={pw} photo={photo} />
                </Item>
                <Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Item>
            </Form>
        </Card>
    );
}

export default Operations;