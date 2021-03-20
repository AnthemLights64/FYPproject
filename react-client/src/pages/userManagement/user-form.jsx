import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const {Item} = Form;
const Option = Select.Option;

export default class UserForm extends PureComponent {

    formRef = React.createRef();

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    UNSAFE_componentWillMount () {
        this.props.setForm(this.formRef);
    }

    render() {

        const formItemLayout = {
        labelCol: { span: 4 },  
        wrapperCol: { span: 15 }, 
        }

        return (
            <Form ref={this.formRef} {...formItemLayout} >
                <Item 
                    label='Username' 
                    name='username'
                    initialValue='' 
                    rules={[{
                        required: true, 
                        message: 'Username must be entered!'
                    }]}
                >
                    <Input placeholder='Please input the username.' />
                </Item>
                <Item 
                    label='Password' 
                    name='password'
                    initialValue='' 
                    rules={[{
                        required: true, 
                        message: 'Password must be entered!'
                    }]}
                >
                    <Input type='password' placeholder='Please input the password.' />
                </Item>
                <Item 
                    label='Role' 
                    name='role_id'
                    initialValue='1' 
                >
                    <Select>
                        <Option value='1'>A</Option>
                        <Option value='2'>B</Option>
                    </Select>
                </Item>
                <Item 
                    label='Notes' 
                    name='notes'
                    initialValue='' 
                >
                    <Input placeholder='Please input the notes.' />
                </Item>
            </Form>
        );
    }
}