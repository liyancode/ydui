import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Radio,
    Select,
    Popconfirm,
    Spin,
    Divider,
    Button,
    AutoComplete,
    DatePicker
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {serviceUser} from "../../../_services/service.user";

class _formNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            defaultPassword: Math.random().toString(36).slice(-8),
            autoCompleteResult: [],
            isUsernameAvailable: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleResetPasswordBtnOnclick = this.handleResetPasswordBtnOnclick.bind(this);
        this.checkUsernameAvailable = this.checkUsernameAvailable.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
//        user_account
//         {
//             "password": "***",
//             "last_update_by": "admin",
//             "user_name": "fortest004",
//             "last_update_at": "2018-12-16 21:55:23 +0800",
//             "created_at": "2018-12-08 17:51:12 +0800",
//             "comment": null,
//             "id": 10,
//             "created_by": "new01",
//             "authorities": "hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw",
//             "status": 1
//         }

        // user_employee_info
        // {
        //     "level": 1,
        //     "department_id": "d001",
        //     "user_name": "fortest004",
        //     "created_at": "2018-12-09 20:45:59 +0800",
        //     "title": "sinor se fdsafa",
        //     "created_by": "admin",
        //     "resignation_date": null,
        //     "last_update_by": "admin",
        //     "report_to": "test001",
        //     "last_update_at": "2018-12-15 22:47:49 +0800",
        //     "annual_leave_left": 7,
        //     "comment": null,
        //     "id": 10001,
        //     "employee_status": "normal",
        //     "onboard_date": "2018-01-01",
        //     "status": 1
        // }

        // user_private_info
        // {
        //     "personal_id": "310771198801012345",
        //     "qq": "1098767778",
        //     "birthday": "1988-01-01",
        //     "hometown": "shanghai",
        //     "address": "add for test",
        //     "education": "master",
        //     "gender": 1,
        //     "user_name": "fortest004",
        //     "wechat": "jacktest221",
        //     "created_at": "2018-12-09 20:52:16 +0800",
        //     "discipline": "cs",
        //     "created_by": "admin",
        //     "dingding": "jack998",
        //     "last_update_by": "admin",
        //     "full_name": "å\u008F¸é©¬æ\u0097 å¿\u008C",
        //     "hobbies": "basketbal",
        //     "last_update_at": "2018-12-15 22:46:18 +0800",
        //     "graduated_school": "NKU",
        //     "comment": null,
        //     "phone_number": "13023456789",
        //     "id": 1,
        //     "age": 30,
        //     "email": "jack@test.com",
        //     "status": 0
        // }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true})
                let auth_str = values["authority"].toString();
                if (auth_str.indexOf('(') >= 0) {
                    auth_str = auth_str.substring(1, auth_str.length - 1)
                }
                let user_account = {
                    "password": values["password"],
                    "last_update_by": "admin",
                    "user_name": values["user_name"],
                    "comment": null,
                    "id": -1,
                    "created_by": "admin",
                    "authorities": auth_str,
                    "status": 1
                }

                let user_employee_info0 = {
                    "id": -1,
                    "user_id": '-1',
                    "full_name": values["full_name"],
                    "gender": values["gender"],
                    "birthday": values["birthday"],
                    "marital_status": "0",
                    "department_id": values["department_id"],
                    "title": values["title"],
                    "office": values["office"],
                    "onboard_at": values["onboard_at"],
                    "position_status": values["position_status"],
                    "email": values["email"],
                    "phone_number": values["phone_number"],
                    "address": "",
                    "hometown": values["hometown"],
                    "status": 1
                }

                let user_employee_info = {
                    "level": 1,
                    "department_id": values["department_id"],
                    "user_name": values["user_name"],
                    "title": values["title"],
                    "created_by": "admin",
                    "resignation_date": null,
                    "last_update_by": "admin",
                    "report_to": values["report_to"],
                    "annual_leave_left": 7,
                    "comment": null,
                    "id": -1,
                    "employee_status": values["position_status"],
                    "onboard_date": values["onboard_at"],
                    "status": 1
                }

                let user_private_info = {
                    "personal_id": "",
                    "qq": "",
                    "birthday": values["birthday"],
                    "hometown": values["hometown"],
                    "address": "*",
                    "education": "*",
                    "gender": values["gender"],
                    "user_name": values["user_name"],
                    "wechat": "*",
                    "discipline": "*",
                    "created_by": "admin",
                    "dingding": "*",
                    "last_update_by": "admin",
                    "full_name": values["full_name"],
                    "hobbies": "*",
                    "graduated_school": "*",
                    "comment": null,
                    "phone_number": values["phone_number"],
                    "id": -1,
                    "age": 0,
                    "email": values["email"],
                    "status": 1
                }

                let userData = {
                    user_account: user_account,
                    user_employee_info: user_employee_info,
                    user_private_info: user_private_info
                }
                serviceUser.addUserAccountEmployeePrivateInfo(userData).then(data => {
                    this.setState({loading: false})
                })

            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleResetPasswordBtnOnclick() {
        this.setState({
            defaultPassword: Math.random().toString(36).slice(-8),
        })
    }

    checkUsernameAvailable(e) {
        let userName = e.target.value;
        this.setState({
            isUsernameAvailable: false,
        })

        if (userName.length > 0) {
            // 1 用户名正则
            // 用户名正则，4到16位（字母，数字，下划线，减号）
            const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if (uPattern.test(userName)) {
                serviceUser.checkUsernameAvailable(userName).then(data => {
                    this.setState({
                        isUsernameAvailable: data.is_available,
                    })
                });
            } else {
                this.setState({
                    isUsernameAvailable: false,
                })
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

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

        const isUsermnameAvailableIcon = this.state.isUsernameAvailable ?
            <span style={{color: '#00a82d'}}>用户名可用<Icon type="check-circle"/></span> :
            <span style={{color: '#ec4639'}}>用户名不可用<Icon type="close-circle"/></span>

        const authoritySelectOptions = [
            <Option key='admin' value='hr:rw,crm:rw,order:rw,fin:rw,product:rw,warehouse:rw'>超级管理员(最高权限)</Option>,
            <Option key='hr:r' value='hr:r'>员工档案</Option>,
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
            initialValue: 'hr:r',
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
            initialValue: '苏州盛泽',
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
            initialValue: 'normal',
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

        const resetPasswordBtn = (
            <span onClick={this.handleResetPasswordBtnOnclick}><Icon type={"reload"}/>随机密码</span>);

        const userGenderRadio = getFieldDecorator('gender', {
            initialValue: 0,
        })(
            <RadioGroup>
                <Radio value={0}>女</Radio>
                <Radio value={1}>男</Radio>
            </RadioGroup>
        );

        const all_user_departments = this.props.all_user_departments;
        let department_options = [];
        let dpt_i={}
        for (let i = 0; i < all_user_departments.length; i++) {
            dpt_i=all_user_departments[i];
            // {"id":1,
            // "created_at":"2018-12-09 16:58:43 +0800","created_by":"admin","last_update_at":"2018-12-09 17:15:52 +0800","last_update_by":"admin","status":1,"comment":null,
            // "department_id":"d001",
            // "parent_department_id":"d000",
            // "department_name":"testdp001a",
            // "department_manager":"test01","department_employee_count":1,"department_description":null}
            department_options.push(
                <Option value={dpt_i["department_id"]}
                        key={i}>
                    {dpt_i["department_name"] + '(部门负责人:' + dpt_i["department_manager"] + ')'}
                </Option>
            )
        }
        const departmentsSelector = getFieldDecorator('department_id', {
            rules: [{
                required: true, message: '请选择部门!',
            }],
            initialValue: all_user_departments[0]["department_id"],
        })(
            <Select
                placeholder="所属部门"
            >
                {department_options}
            </Select>
        );

        // 2 密码强度正则
        // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        // var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;//输出 true
        // console.log("==" + pPattern.test("iFat3#"));
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="用户名(例如：xiaoming01)"
                    >
                        {getFieldDecorator('user_name', {
                            rules: [{
                                required: true, message: '请输入唯一的用户名(只能包含 英文字母、数字）!',
                            }],
                        })(
                            <Input onBlur={this.checkUsernameAvailable} addonAfter={isUsermnameAvailableIcon}/>
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
                            initialValue: this.state.defaultPassword
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
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider orientation={"left"}><span>工作信息</span><Icon type="solution"/></Divider>
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                    >
                        {departmentsSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入职位信息!',
                            }],
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
                                required: true, message: '请输入入职日期!',
                            }],
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
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedFormNewUser = Form.create()(_formNewUser);

export default WrappedFormNewUser;