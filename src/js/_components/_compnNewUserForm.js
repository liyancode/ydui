import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete,DatePicker} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {userService} from "../_services/user.service";

class NewUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            defaultPassword:Math.random().toString(36).slice(-9),
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
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
                let user={
                    "id": -1,
                    "user_id":'-1',
                    "user_name":values["user_name"],
                    "password":values["password"],
                    "authority":values["authority"],
                    "type":"normal",
                    "status": 1
                }

                let user_employee_info={
                    "id": -1,
                    "user_id":'-1',
                    "full_name":values["full_name"],
                    "gender":values["gender"],
                    "birthday":values["birthday"],
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

                let userData={
                    user:user,
                    user_employee_info:user_employee_info
                }
                userService.addUser(userData).then(data => {
                    this.setState({loading: false});
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
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

        const authoritySelectOptions=[
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

        const userGenderRadio = getFieldDecorator('gender', {
            initialValue: 0,
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
                        })(
                            <Input/>
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
                            initialValue:this.state.defaultPassword
                        })(
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
                        {getFieldDecorator('department_id', {
                            rules: [{
                                required: true, message: '请输入部门信息!',
                            }],
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
                            rules: [],
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
                        {getFieldDecorator('mobile', {
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

const WrappedNewUserForm = Form.create()(NewUserForm);

export default WrappedNewUserForm;