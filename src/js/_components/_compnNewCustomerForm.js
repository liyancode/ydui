import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {customerService} from '../_services/customer.service';

class NewCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //     #             "id": 1,
//     #             "customer_id": "201",
//     #             "added_by_user_name": "testname104",
//     #             "company_name": "测试公司名称001",
//     #             "company_location": "china",
//     #             "company_tax_number": null,
//     #             "company_legal_person": null,
//     #             "company_main_business": null,
//     #             "company_tel_number": null,
//     #             "company_email": null,
//     #             "company_description": null,
//     #             "comment": null,
//     #             "status": 1

        // contact
        // {
        //     "id": 3,
        //     "customer_id": "203",
        //     "added_by_user_name": "tu02",
        //     "fullname": "tufn02",
        //     "gender": 1,
        //     "title": null,
        //     "email": null,
        //     "phone_number": null,
        //     "other_contact_info": null,
        //     "comment": null,
        //     "created_at": "2018-07-08 22:53:53 +0800",
        //     "last_update_at": "2018-07-08 22:53:53 +0800",
        //     "status": 1
        // },
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let customer = {
                    "id": -1,
                    "added_by_user_name": "",
                    "company_name": values["company_name"],
                    "company_location": values["company_location"],
                    "company_tax_number": values["company_tax_number"],
                    "company_legal_person": values["company_legal_person"],
                    "company_main_business": values["company_main_business"],
                    "company_tel_number": values["company_tel_number"],
                    "company_email": values["company_email"],
                    "company_description": values["company_description"],
                    "comment": values["comment"],
                    "status": 1,
                };
                let contact = {
                    "id": -1,
                    "customer_id": null,
                    "added_by_user_name": null,
                    "fullname": values["contact_fullname"],
                    "gender": values["contact_gender"],
                    "title": values["contact_title"],
                    "email": values["contact_email"],
                    "phone_number": values["contact_phone_number"],
                    "other_contact_info": null,
                    "comment": null,
                    "status": 1
                };
                let customerData = {"customer": customer, "contact": contact}
                customerService.addCustomer(customerData).then(data => {
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
        const {autoCompleteResult} = this.state;

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const contactGenderRadio = getFieldDecorator('contact_gender', {
            initialValue: 0,
        })(
            <RadioGroup>
                <Radio value={0}>女士</Radio>
                <Radio value={1}>先生</Radio>
            </RadioGroup>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                    >
                        {getFieldDecorator('company_name', {
                            rules: [{
                                required: true, message: '请输入公司名!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司所在地"
                    >
                        {getFieldDecorator('company_location', {
                            rules: [{
                                required: true, message: '请输入公司所在地!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              公司税号&nbsp;
                                <Tooltip title="中国的公司有统一税号">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('company_tax_number', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司法人"
                    >
                        {getFieldDecorator('company_legal_person', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司主营业务"
                    >
                        {getFieldDecorator('company_main_business', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司网站"
                    >
                        {getFieldDecorator('company_description', {
                            rules: [],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="网址"
                            >
                                <Input/>
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司电话"
                    >
                        {getFieldDecorator('company_tel_number', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司邮箱"
                    >
                        {getFieldDecorator('company_email', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司备注"
                    >
                        {getFieldDecorator('comment', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Divider>公司联系人</Divider>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('contact_fullname', {
                            rules: [{
                                required: true, message: '请输入联系人姓名!',
                            }],
                        })(
                            <Input addonAfter={contactGenderRadio}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职务"
                    >
                        {getFieldDecorator('contact_title', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话"
                    >
                        {getFieldDecorator('contact_phone_number', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('contact_email', {
                            rules: [{
                                required: true, message: '请输入联系人邮箱!',
                            }],
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

const WrappedNewCustomerForm = Form.create()(NewCustomerForm);
export default WrappedNewCustomerForm;