import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './event-form.less';

const {List, Item} = Form;

export default class EventForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    UNSAFE_componentWillMount () {
        this.props.setForm(this.formRef);
    }

    render() {

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
        };

        return (
            <Form ref={this.formRef} {...formItemLayoutWithOutLabel}>
                <List 
                    name="events"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Events' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input the event or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Event" style={{ width: '60%' }} />
                                    </Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Item>
                            ))}
                            <Item key="newEvent">
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add new event
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Item>
                        </>
                    )}
                </List>
            </Form>
        );
    }
}