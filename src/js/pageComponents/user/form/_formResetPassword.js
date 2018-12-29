import React from 'react';
import {
    Form,
    Input,
    Icon,
    Radio,
    Select,
    Popconfirm,
    Spin,
    Divider,
    Button,
} from 'antd';

const FormItem = Form.Item;

import {serviceUser} from "../../../_services/service.user";
import {tokenExpired} from "../../../_helpers/tokenExpired"

class _formResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            one_user: props.one_user,
            defaultPassword: Math.random().toString(36).slice(-8),
            resetPassword: '***',
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleResetPasswordBtnOnclick = this.handleResetPasswordBtnOnclick.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let body = {
                    "user_name": this.state.one_user.user_name,
                    "old_password": values["password"],
                    "new_password": values["password_new"]
                }
                serviceUser.updateUserAccountPassword(body).then(data => {
                    this.setState({loading: false});
                    if (data!=null) {
                        tokenExpired();
                    }
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleResetPasswordBtnOnclick() {
        this.setState({
            resetPassword: Math.random().toString(36).slice(-8),
        })
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password_new')) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const one_user = this.state.one_user;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('user_name', {
                            rules: [{
                                required: true,
                            }],
                            initialValue: one_user.user_name,
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入原密码!',
                            }],
                        })(
                            <Input type='password'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码"
                    >
                        {getFieldDecorator('password_new', {
                            rules: [{
                                required: true, message: '请输入新密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }]
                        })(
                            <Input type='password'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认新密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入新密码!',
                            }, {validator: this.compareToFirstPassword,}],

                        })(
                            <Input type='password' onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认修改？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedFormResetPassword = Form.create()(_formResetPassword);

export default WrappedFormResetPassword;