import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
import {serviceCustomer} from '../../../_services/service.customer';

class _formNewCustomerFollowup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
            followup_method: "email",
            id_name: "邮箱地址",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
        this.handleFollowupMethodRadioChange = this.handleFollowupMethodRadioChange.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        // {
        //         "followup_status": "potential",
        //         "followup_method_my_id": "ad@yd.com",
        //         "user_name": "admin",
        //         "followup_method": "email",
        //         "followup_description": "talkdddfdsafa",
        //         "created_by": "admin",
        //         "last_update_by": "admin",
        //         "comment": null,
        //         "id": 5,
        //         "customer_id": "218",
        //         "followup_method_customer_id": "xm@test.com",
        //         "status": 1
        //     }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let customer_followup = {
                    "id": -1,
                    "followup_status": values["followup_status"],
                    "followup_method_my_id": values["followup_method_my_id"],
                    "user_name": "",
                    "followup_method": values["followup_method"],
                    "followup_description": values["followup_description"],
                    "created_by": "",
                    "last_update_by": "",
                    "customer_id": this.props.one_customer.customer.customer_id,
                    "followup_method_customer_id": values["followup_method_customer_id"],
                    "comment": "",
                    "status": 1,
                };
                serviceCustomer.addCustomerFollowup(customer_followup).then(data => {
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

    handleFollowupMethodRadioChange(e) {
        let method = e.target.value;
        let id_name = "邮箱地址";
        if (method === "phone") {
            id_name = "电话号码";
        } else if (method === "wechat_or_qq") {
            id_name = "微信/QQ账号";
        } else if (method === "other") {
            id_name = "账号";
        }
        this.setState({
            followup_method: e.target.value,
            id_name: id_name
        });
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

        // --potential潜在/intentional有意向合作/intentional_order意向订单/formal_order正式订单
        const followupStatusSelector = getFieldDecorator('followup_status', {
            initialValue: 'potential',
        })(
            <Select>
                <Option value="potential">潜在客户</Option>
                <Option value="intentional">有合作合作</Option>
                <Option value="intentional_order">已下意向订单</Option>
                <Option value="formal_order">已下正式订单</Option>
            </Select>
        );

        const followupMethodRadio = getFieldDecorator('followup_method', {
            initialValue: "email",
        })(
            <RadioGroup onChange={this.handleFollowupMethodRadioChange}>
                <Radio value="email">E-mail</Radio>
                <Radio value="phone">电话</Radio>
                <Radio value="wechat_or_qq">微信/QQ</Radio>
                <Radio value="other">其他方式</Radio>
            </RadioGroup>
        );

        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                    >
                        {getFieldDecorator('customer_id', {
                            rules: [{
                                required: true, message: '请输入公司名!',
                            }],
                            initialValue: this.props.one_customer.customer.customer_id,
                        })(
                            <h4>{this.props.one_customer.customer.company_name}</h4>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="客户状态"
                    >
                        {followupStatusSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="跟进方式"
                    >
                        {followupMethodRadio}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={"我的" + this.state.id_name}
                    >
                        {getFieldDecorator('followup_method_my_id', {
                            rules: [{
                                required: true, message: "请输入我的" + this.state.id_name,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={"客户的" + this.state.id_name}
                    >
                        {getFieldDecorator('followup_method_customer_id', {
                            rules: [{
                                required: true, message: "请输入客户的" + this.state.id_name,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="跟进描述"
                    >
                        {getFieldDecorator('followup_description', {
                            rules: [{
                                required: true, message: "请填写跟进记录！",
                            }],
                        })(
                            <TextArea rows={5}/>
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

const WrappedFormNewCustomerFollowup = Form.create()(_formNewCustomerFollowup);
export default WrappedFormNewCustomerFollowup;