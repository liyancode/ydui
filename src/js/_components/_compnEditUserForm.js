import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete,DatePicker} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {userService} from "../_services/user.service";

class EditUserForm extends React.Component {
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
// "user_employee_info": {
//     "id": 2,
//         "user_id": "102",
//         "full_name": "梅西",
//         "gender": 1,
//         "birthday": "1987-01-01",
//         "marital_status": "1",
//         "department_id": "d01",
//         "title": "m3",
//         "office": "suzhou",
//         "onboard_at": "2018-06-15",
//         "position_status": "normal",
//         "email": "meixi@yaodichina.cn",
//         "phone_number": "15800006666",
//         "address": "阿根廷",
//         "hometown": "阿根廷",
//         "created_at": "2018-07-07 18:19:37 +0800",
//         "last_update_at": "2018-07-07 18:19:37 +0800",
//         "status": 1
// }
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

                let user_employee_info={
                    "id": -1,
                    "user_id":this.state.one_user.user["user_id"],
                    "full_name":values["full_name"],
                    "gender":values["gender"],
                    "birthday":values["birthday"],
                    "marital_status": this.state.one_user.user["marital_status"],
                    "department_id": values["department_id"],
                    "title": values["title"],
                    "office": values["office"],
                    "onboard_at": values["onboard_at"],
                    "position_status": values["position_status"],
                    "email": values["email"],
                    "phone_number": values["phone_number"],
                    "address": this.state.one_user.user["address"],
                    "hometown": values["hometown"],
                    "status": 1
                }

                let userData={
                    user:user,
                    user_employee_info:user_employee_info
                }
                userService.updateUser(userData).then(data => {
                    this.setState({loading: false});
                });
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

        const authoritySelectOptions=[
            <Option key='admin' value='hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw'>超级管理员(最高权限)</Option>,
            <Option key='hr:r' value='hr:r'>员工档案(普通用户)</Option>,
            <Option key='hr:rw' value='hr:rw'>员工档案(管理员)</Option>,
            <Option key='crm:rw' value='crm:rw'>客户管理</Option>,
            <Option key='order:rw' value='order:rw'>订单管理</Option>,
            <Option key='fin:rw' value='fin:rw'>财务审批</Option>,
            <Option key='product:rw' value='product:rw'>产品管理</Option>,
            <Option key='warehouse:rw' value='warehouse:rw'>库存管理</Option>,
        ]
        const authoritySelector = getFieldDecorator('authority', {
            rules: [{
                required: true, message: '至少需要 员工档案 !',
            }],
            initialValue: one_user.user.authority.split(','),
        })(
            <Select
                mode="multiple"
                placeholder="至少一个权限"
            >
                {authoritySelectOptions}
            </Select>

        );

        const officeSelector = getFieldDecorator('office', {
            rules: [{
                required: true, message: '请选择办公地点!',
            }],
            initialValue: one_user.employee_info.office,
        })(
            <Select
                placeholder="办公地点"
            >
                <Option key='suzhou.shengze' value='苏州盛泽'>苏州盛泽</Option>
            </Select>

        );

        const positionStatusSelector = getFieldDecorator('position_status', {
            rules: [{
                required: true, message: '请选择职位状态!',
            }],
            initialValue: one_user.employee_info.position_status,
        })(
            <Select
                placeholder="职位状态"
            >
                <Option key='position_status.normal' value='normal'>正常在职</Option>
                <Option key='position_status.probation' value='probation'>试用期内</Option>
                <Option key='position_status.dismiss' value='dismiss'>已离职</Option>
                <Option key='position_status.vacation' value='vacation'>休假中</Option>
            </Select>

        );

        const resetPasswordBtn=(<Button onClick={this.handleResetPasswordBtnOnclick}>重置密码</Button>);

        const userGenderRadio = getFieldDecorator('gender', {
            initialValue: one_user.employee_info.gender,
        })(
            <RadioGroup>
                <Radio value={0}>女</Radio>
                <Radio value={1}>男</Radio>
            </RadioGroup>
        );

        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="用户名(唯一！例如：liming01)"
                    >
                        {getFieldDecorator('user_name', {
                            rules: [{
                                required: true, message: '请输入唯一的用户名(只能包含 英文字母、数字）!',
                            }],
                            initialValue: one_user.user.user_name,
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="初始密码(请记住初始密码!)"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请记住初始密码!',
                            }],
                            initialValue:this.state.resetPassword
                        })(
                            <Input disabled={true} addonAfter={resetPasswordBtn}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户权限"
                    >
                        {authoritySelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('full_name', {
                            rules: [{
                                required: true, message: '请输入员工真实姓名!',
                            }],
                            initialValue: one_user.employee_info.full_name,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {userGenderRadio}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                    >
                        {getFieldDecorator('birthday', {
                            rules: [],
                            initialValue: moment(one_user.employee_info.birthday, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="籍贯"
                    >
                        {getFieldDecorator('hometown', {
                            rules: [],
                            initialValue: one_user.employee_info.hometown,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider orientation={"left"}><span>工作信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                    >
                        {getFieldDecorator('department_id', {
                            rules: [{
                                required: true, message: '请输入部门信息!',
                            }],
                            initialValue: one_user.employee_info.department_id,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入职位信息!',
                            }],
                            initialValue: one_user.employee_info.title,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="办公地点"
                    >
                        {officeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入职时间"
                    >
                        {getFieldDecorator('onboard_at', {
                            rules: [{
                                required: true, message: '请输入职日期!',
                            }],
                            initialValue: moment(one_user.employee_info.onboard_at, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位状态"
                    >
                        {positionStatusSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机"
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{
                                required: true, message: '请输入手机号!',
                            }],
                            initialValue: one_user.employee_info.phone_number,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [],
                            initialValue: one_user.employee_info.email,
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交更新？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedEditUserForm = Form.create()(EditUserForm);

export default WrappedEditUserForm;