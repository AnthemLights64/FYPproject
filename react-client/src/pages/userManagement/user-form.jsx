import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const {Item} = Form;
const Option = Select.Option;

export default class UserForm extends PureComponent {

    formRef = React.createRef();

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
    }

    UNSAFE_componentWillMount () {
        this.props.setForm(this.formRef);
    }

    render() {

        const formItemLayout = {
        labelCol: { span: 4 },  
        wrapperCol: { span: 15 }, 
        }

        const {roles, user} = this.props;

        return (
            <Form ref={this.formRef} {...formItemLayout} >
                <Item 
                    label='Username' 
                    name='username'
                    initialValue={user.username} 
                    rules={[{
                        required: true, 
                        message: 'Username must be entered!'
                    }]}
                >
                    <Input placeholder='Please input the username.' />
                </Item>
                {
                    user._id ? null : (
                        <Item 
                            label='Password' 
                            name='password'
                            initialValue={user.password} 
                            rules={[{
                                required: true, 
                                message: 'Password must be entered!'
                            }]}
                        >
                            <Input type='password' placeholder='Please input the password.' />
                        </Item>
                    )
                }
                <Item 
                    label='Role' 
                    name='role_id'
                    initialValue={user.role_id}
                >
                    <Select>
                        {
                            roles.map(role => <Option key={role._id}>{role.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item 
                    label='Notes' 
                    name='notes'
                    initialValue={user.notes}
                >
                    <Input placeholder='Please input the notes.' />
                </Item>
            </Form>
        );
    }
}