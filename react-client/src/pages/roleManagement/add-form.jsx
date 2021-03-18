import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const {Item} = Form;

export default class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    UNSAFE_componentWillMount () {
        this.props.setForm(this.props.form);
    }

    render() {

        const formItemLayout = {
        labelCol: { span: 4 },  
        wrapperCol: { span: 15 }, 
        }

        return (
            <Form >
                <Item 
                    label='Role Name' 
                    name='rolename'
                    {...formItemLayout} 
                    initialValue='nimasile' 
                    rules={[{
                        required: true, 
                        message: 'Role name must be entered!'
                    }]}
                >
                    <Input placeholder='Please input the role name.' />
                </Item>
            </Form>
        );
    }
}