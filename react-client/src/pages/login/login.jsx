import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from './images/logo.png';
import {reqLogin} from '../../api';

const Login = () => {

    const [form] = Form.useForm();

    // "values" includes an array of all form data
    const onFinish = values => {
        
        console.log('Received values of form: ',values);
        form.validateFields()
            .then(async values => {
                //console.log(values);
                // Login request
                const {username, password} = values;
                try {
                    const response = await reqLogin(username, password);
                    console.log('Success', response.data);
                } catch (error) {
                    console.log('Failed', error)
                }
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
    }


    return (
        <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>RNG E-Sports Club</h1>
            </header>
            <section className="login-content">
                <h2>Login</h2>
                <Form className="login-form" onFinish={onFinish} form={form}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 4, message: 'Username must be at least 4 characters!'},
                            { max: 12, message: 'Username can be at most 12 characters!'},
                            { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must consist of letters, numbers or underscores!'},
                        ]}
                    >

                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    
                    </Form.Item>

                    <Form.Item 
                        name="password" 
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            {
                                validator: (_, value) => {
                                    //console.log('validator()', value);
                                    if (!value) {
                                        return Promise.reject("Password must be entered!");
                                    } else if (value.length<4) {
                                        return Promise.reject("Password cannot be less than 4 characters!");
                                    } else if (value.length>12) {
                                        return Promise.reject("Password cannot be more than 12 characters!");
                                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                        return Promise.reject("Password must consist of letters, numbers or underscores!");
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            },                        
                        ]}
                    >
                        
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
    

}

export default Login;