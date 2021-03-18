import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const {Item} = Form;

export default class AddForm extends Component {

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
            <Form ref={this.formRef}>
                <Item 
                    label='Role Name' 
                    name='roleName'
                    {...formItemLayout} 
                    initialValue='' 
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