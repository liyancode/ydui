import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';

import {userService} from "./_services/user.service"

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            login_result: 0,
            user_name: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                console.log('fdsafaaaaaa');
                userService.login(values["userName"], values["password"]).then(data=>{
                    this.setState({loading: false});
                    console.log('fdsafaaaaaa2');
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Spin spinning={this.state.loading} tip="正在登录..." size="large">
                <Form onSubmit={this.handleSubmit} className="login-form"
                      style={{maxWidth: 320, padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.25)'}}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入你的用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: '#52c41a'}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入你的密码！'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: '#f5222d'}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={{color: 'white'}}>记住我</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float: 'right', color: 'white'}}>忘记密码？</a>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                        <a href="" style={{color: 'white'}}>还没有账号？</a>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;