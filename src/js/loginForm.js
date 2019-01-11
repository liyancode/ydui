import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';

import {serviceUser} from "./_services/service.user"

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
                serviceUser.login(values["userName"], values["password"]).then(data=>{
                    this.setState({loading: false});
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Spin spinning={this.state.loading} tip="正在登录..." size="large">
                <Form onSubmit={this.handleSubmit} className="login-form"
                      style={{maxWidth: 320, padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.45)'}}>
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
                        <a className="login-form-forgot" href="#" style={{float: 'right', color: 'white'}}/>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            登录
                        </Button>
                        <Icon type="bulb" style={{color:"#00ac47"}}/>
                        <span style={{color: 'white'}}>提示：没账号或忘记密码，请找管理员。</span>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;