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
import moment from "moment/moment";

class _formEditUser extends React.Component {
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true})
                const oneUser=this.props.one_user;
                const userA=oneUser.user_account;
                const userEI=oneUser.user_employee_info;
                const userPI=oneUser.user_private_info;
                let auth_str = values["authority"].toString();
                if (auth_str.indexOf('(') >= 0) {
                    auth_str = auth_str.substring(1, auth_str.length - 1)
                }
                let user_account = {
                    "password": values["password"],
                    "last_update_by": userA.last_update_by,
                    "user_name": values["user_name"],
                    "comment": userA.comment,
                    "id": userA.id,
                    "created_by": userA.created_by,
                    "authorities": auth_str,
                    "status": userA.status
                }

                let user_employee_info = {
                    "level": userEI.level,
                    "department_id": values["department_id"],
                    "user_name": values["user_name"],
                    "title": values["title"],
                    "created_by": userEI.created_by,
                    "resignation_date": userEI.resignation_date,
                    "last_update_by": userEI.last_update_by,
                    "report_to": values["report_to"],
                    "annual_leave_left": userEI.annual_leave_left,
                    "comment": userEI.comment,
                    "id": userEI.id,
                    "employee_status": values["position_status"],
                    "onboard_date": values["onboard_at"],
                    "status": userEI.status
                }

                let user_private_info = {
                    "personal_id": userPI.personal_id,
                    "qq": userPI.qq,
                    "birthday": values["birthday"],
                    "hometown": values["hometown"],
                    "address": userPI.address,
                    "education": userPI.education,
                    "gender": values["gender"],
                    "user_name": values["user_name"],
                    "wechat":userPI.wechat,
                    "discipline": userPI.discipline,
                    "created_by": userPI.created_by,
                    "dingding": userPI.dingding,
                    "last_update_by": userPI.last_update_by,
                    "full_name": values["full_name"],
                    "hobbies": userPI.hobbies,
                    "graduated_school": userPI.graduated_school,
                    "comment": userPI.comment,
                    "phone_number": values["phone_number"],
                    "id": userPI.id,
                    "age": userPI.age,
                    "email": values["email"],
                    "status": userPI.status
                }

                let userData = {
                    user_account: user_account,
                    user_employee_info: user_employee_info,
                    user_private_info: user_private_info
                }
                serviceUser.updateUserAccountEmployeePrivateInfo(userData).then(data => {
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
        const oneUser=this.props.one_user;
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
            initialValue: oneUser.user_account.authorities.split(','),
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
            initialValue: oneUser.user_employee_info.employee_status,
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
            initialValue: oneUser.user_private_info.gender,
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
            initialValue: oneUser.user_employee_info.department_id,
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
                            initialValue: oneUser.user_account.user_name,
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请记住初始密码!',
                            }],
                            initialValue: "****"
                        })(
                            //{/*<Input disabled={true} addonAfter={resetPasswordBtn}/>*/}
                            <Input disabled={true}/>
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
                            initialValue: oneUser.user_private_info.full_name,
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
                            initialValue:moment(oneUser.user_private_info.birthday, "YYYY-MM-DD"),
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
                            initialValue: oneUser.user_private_info.hometown,
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
                            initialValue: oneUser.user_employee_info.title,
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
                            initialValue:moment(oneUser.user_employee_info.onboard_date, "YYYY-MM-DD"),
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
                            initialValue: oneUser.user_private_info.phone_number,
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
                            initialValue: oneUser.user_private_info.email,
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

const WrappedFormEditUser = Form.create()(_formEditUser);

export default WrappedFormEditUser;