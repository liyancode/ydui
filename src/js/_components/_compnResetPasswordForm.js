import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete,DatePicker} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {userService} from "../_services/user.service";

class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            one_user:props.one_user,
            defaultPassword:Math.random().toString(36).slice(-8),
            resetPassword:'***',
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleResetPasswordBtnOnclick = this.handleResetPasswordBtnOnclick.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // "user": {
//     "id": 2,
//         "user_id": "102",
//         "user_name": "testname102",
//         "password": "***",
//         "authority": "1",
//         "type": "super",
//         "created_at": "2018-07-04 20:52:17 +0800",
//         "last_update_at": "2018-07-04 20:52:17 +0800",
//         "status": 1
// },
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let auth_str=values["authority"].toString();
                if(auth_str.indexOf('(')>=0){
                    auth_str=auth_str.substring(1,auth_str.length-1)
                }
                let user={
                    "id": -1,
                    "user_id":this.state.one_user.user["user_id"],
                    "user_name":values["user_name"],
                    "password":values["password"],
                    "authority":auth_str,
                    "type":this.state.one_user.user["type"],
                    "status": 1
                }
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleResetPasswordBtnOnclick(){
        this.setState({
            resetPassword:Math.random().toString(36).slice(-8),
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const one_user=this.state.one_user;
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
                            }],
                        })(
                            <Input type='password'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认新密码"
                    >
                        {getFieldDecorator('password_new_1', {
                            rules: [{
                                required: true, message: '请再次输入新密码!',
                            }],
                        })(
                            <Input type='password'/>
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

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm);

export default WrappedResetPasswordForm;