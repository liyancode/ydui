import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
// import {userService} from "./_services/user.service"
import {serviceUser} from "./_services/service.user"

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    };

    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                serviceUser.login(values["userName"],values["password"])
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default WrappedHorizontalLoginForm;